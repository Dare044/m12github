import { useState, useEffect } from "react"
import { useAddNewPersonalMutation } from "./personalsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { CARRECS } from "../../config/carrecs"
import React, { Component }  from 'react';

const PERSONAL_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewPersonalForm = () => {

    const [addNewPersonal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPersonalMutation()

    const navigate = useNavigate()

    const [nom, setNom] = useState('')
    const [contrasenya, setContrasenya] = useState('')
    const [cognoms, setCognoms] = useState('')
    const [gmail, setGmail] = useState('')
    const [familia, setFamilia] = useState('')
    const [carrecs, setCarrecs] = useState(['643bd9ee7f3b35c976672ca8'])

    const [validNom, setValidNom] = useState(false)
    const [validContrasenya, setValidContrasenya] = useState(false)

    useEffect(() => {
        setValidNom(PERSONAL_REGEX.test(nom))
    }, [nom])

    useEffect(() => {
        setValidContrasenya(PWD_REGEX.test(contrasenya))
    }, [contrasenya])

    useEffect(() => {
        if (isSuccess) {
            setNom('')
            setContrasenya('')
            setCognoms('')
            setGmail('')
            setFamilia('')
            setCarrecs('')
            navigate('/dash/personals')
        }
    }, [isSuccess, navigate])

    const onNomChanged = e => setNom(e.target.value)
    const onCognomsChanged = e => setCognoms(e.target.value)
    const onGmailChanged = e => setGmail(e.target.value)
    const onFamiliaChanged = e => setFamilia(e.target.value)
    const onContrasenyaChanged = e => setContrasenya(e.target.value)
    

    const onCarrecsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setCarrecs(values)
    }

    const canSave = [validNom, validContrasenya].every(Boolean) && !isLoading

    const onSavePersonalClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewPersonal({ nom, cognoms, gmail, contrasenya, familia, carrecs })
        }
    }

    // Cambia esto
    const options = Object.values(CARRECS).map(carrec => {
        return (
            <option
                key={carrec}
                value={carrec}

            > {carrec}</option >
        )
    })

    // Esto son clases que se ponen
    const errClass = isError ? "errmsg" : "offscreen"
    const validPersonalClass = !validNom ? 'form__input--incomplete' : ''
    const validPwdClass = !validContrasenya ? 'form__input--incomplete' : ''
    // const validCarrecsClass = !Boolean(carrecs.length) ? 'form__input--incomplete' : ''


const content = (
  <div className="container d-flex justify-content-center">
    <div className="col-md-8 col-lg-6">
      <p className={errClass}>{error?.data?.message}</p>
      <form className="form" onSubmit={onSavePersonalClicked}>
        <div className="form__title-row">
          <h2>New Personal</h2>
          <div className="form__action-buttons">
            <button
              className="btn btn-primary"
              title="Save"
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="nom">
            Nom: <span className="nowrap">[3-20 letters]</span>
          </label>
          <input
            className={`form-control ${validPersonalClass}`}
            id="nom"
            name="nom"
            type="text"
            autoComplete="off"
            value={nom}
            onChange={onNomChanged}
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="cognoms">
            Cognoms:
          </label>
          <input
            className={`form-control ${validPersonalClass}`}
            id="cognoms"
            name="cognoms"
            type="text"
            autoComplete="off"
            value={cognoms}
            onChange={onCognomsChanged}
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="gmail">
            Gmail:
          </label>
          <input
            className={`form-control ${validPersonalClass}`}
            id="gmail"
            name="gmail"
            type="text"
            autoComplete="off"
            value={gmail}
            onChange={onGmailChanged}
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="contrasenya">
            Contrasenya:{" "}
            <span className="nowrap">
              [4-12 chars incl. !@#$%]
            </span>
          </label>
          <input
            className={`form-control ${validPwdClass}`}
            id="contrasenya"
            name="contrasenya"
            type="password"
            value={contrasenya}
            onChange={onContrasenyaChanged}
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="familia">
            Familia:
          </label>
          <input
            className={`form-control ${validPersonalClass}`}
            id="familia"
            name="familia"
            type="text"
            autoComplete="off"
            value={familia}
            onChange={onFamiliaChanged}
          />
        </div>
        <div className="form-group">
          <label className="form__label" htmlFor="carrecs">
            ASSIGNED CARRECS:
          </label>
          <select
            id="carrecs"
            name="carrecs"
            className={`form-control ${validPersonalClass}`}
            multiple={true}
            size="3"
            value={carrecs}
            onChange={onCarrecsChanged}
          >
            {options}
          </select>
        </div>
      </form>
    </div>
  </div>
);
      

    return content
}
export default NewPersonalForm