import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const personalsAdapter = createEntityAdapter({})

const initialState = personalsAdapter.getInitialState()

export const personalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPersonals: builder.query({
            query: () => '/personal',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5, // Este valor suele ser 60
            transformResponse: responseData => {
                const loadedPersonals = responseData.map(personal => {
                    personal.id = personal._id
                    return personal
                });
                return personalsAdapter.setAll(initialState, loadedPersonals)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Personal', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Personal', id }))
                    ]
                } else return [{ type: 'Personal', id: 'LIST' }]
            }
        }),
    }),
})

export const {
    useGetPersonalsQuery,
} = personalsApiSlice

// returns the query result object
export const selectPersonalsResult = personalsApiSlice.endpoints.getPersonals.select()

// creates memoized selector
const selectPersonalsData = createSelector(
    selectPersonalsResult,
    personalsResult => personalsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllPersonals,
    selectById: selectPersonalById,
    selectIds: selectPersonalIds
    // Pass in a selector that returns the personals slice of state
} = personalsAdapter.getSelectors(state => selectPersonalsData(state) ?? initialState)