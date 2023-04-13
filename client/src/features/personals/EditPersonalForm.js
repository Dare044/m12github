import { useState, useEffect } from "react"
import { useUpdatePersonalMutation, useDeletePersonalMutation } from "./personalsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { CARRECS } from "../../config/carrecs"
import React, { Component }  from 'react';

const PERSONAL_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditPersonalForm = ({ personal }) => {

    const [updatePersonal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdatePersonalMutation()

    const [deletePersonal, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeletePersonalMutation()

    const navigate = useNavigate()

    const [nom, setNom] = useState(personal.nom)
    const [cognoms, setCognoms] = useState(personal.cognoms)
    const [gmail, setGmail] = useState(personal.gmail)
    const [contrasenya, setContrasenya] = useState('')
    const [familia, setFamilia] = useState(personal.familia)
    const [carrecs, setCarrecs] = useState(personal.carrecs)

    const [validContrasenya, setValidContrasenya] = useState(false)
    const [validNom, setValidNom] = useState(false)

    useEffect(() => {
        setValidNom(PERSONAL_REGEX.test(nom))
    }, [nom])

    useEffect(() => {
        setValidContrasenya(PWD_REGEX.test(contrasenya))
    }, [contrasenya])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setNom('')
            setCognoms('')
            setGmail('')
            setContrasenya('')
            setFamilia('')
            setCarrecs([])
            navigate('/dash/personals')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onNomChanged = e => setNom(e.target.value)
    const onCognomsChanged = e => setCognoms(e.target.value)
    const onGmailChanged = e => setGmail(e.target.value)
    const onContrasenyaChanged = e => setContrasenya(e.target.value)
    const onFamiliaChanged = e => setFamilia(e.target.value)

    const onCarrecsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setCarrecs(values)
    }

    const onSavePersonalClicked = async (e) => {
        if (contrasenya) {
            await updatePersonal({ id: personal.id, nom, cognoms, gmail, contrasenya, familia, carrecs })
        } else {
            await updatePersonal({ id: personal.id, nom, cognoms, gmail, familia, carrecs })
        }
    }

    const onDeletePersonalClicked = async () => {
        await deletePersonal({ id: personal.id })
    }

    const options = Object.values(CARRECS).map(carrec => {
        return (
            <option
                key={carrec}
                value={carrec}

            > {carrec}</option >
        )
    })

    let canSave
    if (contrasenya) {
        canSave = [validNom, validContrasenya].every(Boolean) && !isLoading
    } else {
        canSave = [validNom].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validPersonalClass = !validNom ? 'form__input--incomplete' : ''
    const validPwdClass = contrasenya && !validContrasenya ? 'form__input--incomplete' : ''
    // const validCarrecsClass = !Boolean(carrecs.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Personal</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSavePersonalClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeletePersonalClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
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

                <label className="form__label" htmlFor="cognoms"> Cognom: </label>
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
                    Contrasenya: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label>
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
                    className={``}
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
export default EditPersonalForm