import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPersonalById } from './personalsApiSlice'
import EditPersonalForm from './EditPersonalForm.js'

const EditPersonal = () => {
    const { id } = useParams()

    const personal = useSelector(state => selectPersonalById(state, id))

    const content = personal ? <EditPersonalForm personal={personal} /> : <p>Loading...</p>

    return content
}
export default EditPersonal