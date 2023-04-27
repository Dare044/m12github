import { useGetPersonalsQuery } from "./personalsApiSlice"
import Personal from './Personal'
import React, { Component }  from 'react';

const PersonalsList = () => {

    const {
        data: personals,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetPersonalsQuery(undefined, {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = personals

        const tableContent = ids?.length
            ? ids.map(personalId => <Personal key={personalId} personalId={personalId} />)
            : null

        content = (
            <div class="container">
            <div class="row justify-content-center">
            <div class="col-md-8">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" className="">Nom personal</th>
                        <th scope="col" className="">Cognoms</th>
                        <th scope="col" className="">Gmail</th>
                        <th scope="col" className="">Familia</th>
                        <th scope="col" className="">Carrecs</th>
                        <th scope="col" className="">Operations</th>

                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
            </div></div></div>
        )
    }

    return content
}
export default PersonalsList