import { useSelector } from 'react-redux'
import { selectAllPersonals } from '../personals/personalsApiSlice'
import NewPersonalForm from './NewPersonalForm'

const NewPersonal = () => {
    const personals = useSelector(selectAllPersonals)

    const content = personals ? <NewPersonalForm personals={personals} /> : <p>Loading...</p>

    return content
}
export default NewPersonal