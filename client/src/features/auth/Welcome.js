import { Link } from 'react-router-dom'
import React, { Component }  from 'react';

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-EU', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">

            <p>{today}</p>

            <h1>Welcome!</h1>

            <p><Link to="/dash/notes">View techNotes</Link></p>

            <p><Link to="/dash/users">View User Settings</Link></p>

            <p><Link to="/dash/personals">View Personal</Link></p>
        
            <p><Link to="/dash/personals/new">Add New Personal</Link></p>
        </section>
    )

    return content
}
export default Welcome