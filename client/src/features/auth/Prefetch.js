import { store } from '../../app/store'
import { notesApiSlice } from '../notes/notesApiSlice'
import { personalsApiSlice } from '../personals/personalsApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')
        const notes = store.dispatch(notesApiSlice.endpoints.getNotes.initiate())
        const personals = store.dispatch(personalsApiSlice.endpoints.getPersonals.initiate())

        return () => {
            console.log('unsubscribing')
            notes.unsubscribe()
            personals.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch