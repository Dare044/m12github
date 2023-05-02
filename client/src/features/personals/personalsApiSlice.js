import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice"

const personalsAdapter = createEntityAdapter({}) // Con esto puedes hacer que se ordene por algo

const initialState = personalsAdapter.getInitialState()

export const personalsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPersonals: builder.query({
            query: () => '/personal',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
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
        addNewPersonal: builder.mutation({
            query: initialPersonalData => ({
                url: '/personal/create', // Esto lo tienes que cambiar
                method: 'POST',  // Esto lo tienes que cambiar
                body: {
                    ...initialPersonalData,
                }
            }),
            invalidatesTags: [
                { type: 'Personal', id: "LIST" }
            ]
        }),
        updatePersonal: builder.mutation({
            query: initialPersonalData => ({
              url: `/personal/update/${initialPersonalData.id}`,
              method: 'POST',
              body: {
                ...initialPersonalData,
              },
            }),
            invalidatesTags: (result, error, arg) => [
              { type: 'Personal', id: arg.id },
            ],
          }),
        deletePersonal: builder.mutation({
            query: ({id}) => ({
                url: `/personal/delete/${id}`,
                method: 'POST',
                body: { id },
            }),
            invalidatesTags: (result, error, id) => [
                { type: 'Personal', id },
            ],
        }),
    }),
})

export const {
    useGetPersonalsQuery,
    useAddNewPersonalMutation,
    useUpdatePersonalMutation,
    useDeletePersonalMutation,
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