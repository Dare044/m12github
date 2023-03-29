import { useState, useEffect } from "react"
import { useUpdatePersonalMutation, useDeletePersonalMutation } from "./personalsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { CARRECS } from "../../config/carrecs"

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

    const [personalnom, setPersonalnom] = useState(personal.personalnom)
    const [validPersonalnom, setValidPersonalnom] = useState(false)
    const [contrasenya, setContrasenya] = useState('')
    const [validContrasenya, setValidContrasenya] = useState(false)
    const [carrecs, setCarrecs] = useState(personal.carrecs)

    useEffect(() => {
        setValidPersonalnom(PERSONAL_REGEX.test(personalnom))
    }, [personalnom])

    useEffect(() => {
        setValidContrasenya(PWD_REGEX.test(contrasenya))
    }, [contrasenya])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setPersonalnom('')
            setContrasenya('')
            setCarrecs([])
            navigate('/dash/personals')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onPersonalnomChanged = e => setPersonalnom(e.target.value)
    const onContrasenyaChanged = e => setContrasenya(e.target.value)

    const onCarrecsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setCarrecs(values)
    }

    const onSavePersonalClicked = async (e) => {
        if (contrasenya) {
            await updatePersonal({ id: personal.id, personalnom, contrasenya, carrecs })
        } else {
            await updatePersonal({ id: personal.id, personalnom, carrecs })
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
        canSave = [carrecs.length, validPersonalnom, validContrasenya].every(Boolean) && !isLoading
    } else {
        canSave = [carrecs.length, validPersonalnom].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validPersonalClass = !validPersonalnom ? 'form__input--incomplete' : ''
    const validPwdClass = contrasenya && !validContrasenya ? 'form__input--incomplete' : ''
    const validCarrecsClass = !Boolean(carrecs.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p classNom={errClass}>{errContent}</p>

            <form classNom="form" onSubmit={e => e.preventDefault()}>
                <div classNom="form__title-row">
                    <h2>Edit Personal</h2>
                    <div classNom="form__action-buttons">
                        <button
                            classNom="icon-button"
                            title="Save"
                            onClick={onSavePersonalClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            classNom="icon-button"
                            title="Delete"
                            onClick={onDeletePersonalClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label classNom="form__label" htmlFor="personalnom">
                    Personalnom: <span classNom="nowrap">[3-20 letters]</span></label>
                <input
                    classNom={`form__input ${validPersonalClass}`}
                    id="personalnom"
                    nom="personalnom"
                    type="text"
                    autoComplete="off"
                    value={personalnom}
                    onChange={onPersonalnomChanged}
                />

                <label classNom="form__label" htmlFor="contrasenya">
                    Contrasenya: <span classNom="nowrap">[empty = no change]</span> <span classNom="nowrap">[4-12 chars incl. !@#$%]</span></label>
                <input
                    classNom={`form__input ${validPwdClass}`}
                    id="contrasenya"
                    nom="contrasenya"
                    type="contrasenya"
                    value={contrasenya}
                    onChange={onContrasenyaChanged}
                />

                <label classNom="form__label" htmlFor="carrecs">
                    ASSIGNED CARRECS:</label>
                <select
                    id="carrecs"
                    nom="carrecs"
                    classNom={`form__select ${validCarrecsClass}`}
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