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
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSavePersonalClicked}>
                <div className="form__title-row">
                    <h2>New Personal</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="nom">
                    Nom: <span className="nowrap">[3-20 letters]</span></label>
                <input
                    className={``}
                    id="nom"
                    nom="nom"
                    type="text"
                    autoComplete="off"
                    value={nom}
                    onChange={onNomChanged}
                />
                <label className="form__label" htmlFor="cognoms"> Cognoms: </label>
                <input
                    className={``}
                    id="cognoms"
                    nom="cognoms"
                    type="text"
                    autoComplete="off"
                    value={cognoms}
                    onChange={onCognomsChanged}
                />
                <label className="form__label" htmlFor="gmail"> Gmail: </label>
                <input
                    className={``}
                    id="gmail"
                    nom="gmail"
                    type="text"
                    autoComplete="off"
                    value={gmail}
                    onChange={onGmailChanged}
                />

                <label className="form__label" htmlFor="contrasenya">
                    Contrasenya: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    className={`form__input ${validPwdClass}`}
                    id="contrasenya"
                    nom="contrasenya"
                    type="password"
                    value={contrasenya}
                    onChange={onContrasenyaChanged}
                />

                <label className="form__label" htmlFor="familia"> Familia: </label>
                <input
                    className={``}
                    id="familia"
                    nom="familia"
                    type="text"
                    autoComplete="off"
                    value={familia}
                    onChange={onFamiliaChanged}
                />

                <label className="form__label" htmlFor="carrecs">
                    ASSIGNED CARRECS:</label>
                <select
                    id="carrecs"
                    nom="carrecs"
                    className={`form__select`}
                    multiple={true}
                    size="3"
                    value={carrecs}
                    onChange={onCarrecsChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}
export default NewPersonalForm