import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPersonalById } from './personalsApiSlice'

const Personal = ({ personalId }) => {
    const personal = useSelector(state => selectPersonalById(state, personalId))

    const navigate = useNavigate()

    if (personal) {
        const handleEdit = (personalId) => {
        navigate(`/dash/personals/${personalId}`);
        }        
        const stringCarrecs = personal.carrecs.join(', ');

        return (
            <tr className="">
                <td className="">{personal.nom}</td>
                <td className="">{personal.cognoms}</td>
                <td className="">{personal.gmail}</td>
                <td className="">{personal.familia}</td>
                <td className="">{stringCarrecs}</td>
                <td className="">
                    <button
                    className="icon-button table__button"
                    onClick={() => handleEdit(personal.id)}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default Personal