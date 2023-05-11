import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPersonalById } from './personalsApiSlice'
import EditPersonalForm from './EditPersonalForm.js'
import React, { Component }  from 'react';
import { useNavigate } from 'react-router-dom'

const EditPersonal = () => {
    const navigate = useNavigate()
    
    const { id } = useParams()

    const personal = useSelector(state => selectPersonalById(state, id))

    const content = personal ? <EditPersonalForm personal={personal} /> : navigate('/dash/personals')

    return content
}
export default EditPersonal