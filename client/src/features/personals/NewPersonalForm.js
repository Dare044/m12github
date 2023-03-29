import { useState, useEffect } from "react"
import { useAddNewPersonalMutation } from "./personalsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { CARRECS } from "../../config/carrecs"

const PERSOnal_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewPersonalForm = () => {

    const [addNewPersonal, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewPersonalMutation()

    const navigate = useNavigate()

    const [personalnom, setPersonalnom] = useState('')
    const [validPersonalnom, setValidPersonalnom] = useState(false)
    const [contrasenya, setContrasenya] = useState('')
    const [validContrasenya, setValidContrasenya] = useState(false)
    const [carrecs, setCarrecs] = useState(["Employee"])

    useEffect(() => {
        setValidPersonalnom(PERSOnal_REGEX.test(personalnom))
    }, [personalnom])

    useEffect(() => {
        setValidContrasenya(PWD_REGEX.test(contrasenya))
    }, [contrasenya])

    useEffect(() => {
        if (isSuccess) {
            setPersonalnom('')
            setContrasenya('')
            setCarrecs([])
            navigate('/dash/personals')
        }
    }, [isSuccess, navigate])

    const onPersonalnomChanged = e => setPersonalnom(e.target.value)
    const onContrasenyaChanged = e => setContrasenya(e.target.value)

    const onCarrecsChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setCarrecs(values)
    }

    const canSave = [carrecs.length, validPersonalnom, validContrasenya].every(Boolean) && !isLoading

    const onSavePersonalClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewPersonal({ personalnom, contrasenya, carrecs })
        }
    }

    const options = Object.values(CARRECS).map(carrec => {
        return (
            <option
                key={carrec}
                value={carrec}

            > {carrec}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validPersonalClass = !validPersonalnom ? 'form__input--incomplete' : ''
    const validPwdClass = !validContrasenya ? 'form__input--incomplete' : ''
    const validCarrecsClass = !Boolean(carrecs.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p classNom={errClass}>{error?.data?.message}</p>

            <form classNom="form" onSubmit={onSavePersonalClicked}>
                <div classNom="form__title-row">
                    <h2>New Personal</h2>
                    <div classNom="form__action-buttons">
                        <button
                            classNom="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
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
                    Contrasenya: <span classNom="nowrap">[4-12 chars incl. !@#$%]</span></label>
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
export default NewPersonalForm