import { Link } from 'react-router-dom'
import React, { Component }  from 'react';

const Welcome = () => {

    const date = new Date()
    const today = new Intl.DateTimeFormat('es-EU', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>{today}</p>
  
              <h1 className="display-4">Benvingut!</h1>
  
              <p>
                <Link to="/dash/personals" className="btn btn-primary">
                  View Personal
                </Link>
              </p>
  
              <p>
                <Link to="/dash/personals/new" className="btn btn-secondary">
                  Add New Personal
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    )

    return content
}
export default Welcome