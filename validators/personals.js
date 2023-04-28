const { check } = require('express-validator') 
const { validateResult } = require('../helpers/validateHelper')

const validateCreate = [
    check ('nom')
    .not().isEmpty()
    .withMessage('No has indicat cap nom'),

    check ('cognoms')
    .not().isEmpty()
    .withMessage('No has indicat cap cognom'),

    check ('gmail')
    .not().isEmpty()
    .withMessage("No has indicat cap email")
    .isEmail()
    .withMessage("L'email no té un format correcte"),

    check ('contrasenya')
    .not().isEmpty()
    .withMessage('No has indicat contrasenya'),

    check ('familia')
    .not().isEmpty()
    .withMessage('Nos han indicat cap familia'),

    check ('carrecs')
    .not().isEmpty()
    .withMessage('No has indicat cap carrec'),
    
    (req, res, next) => {
        validateResult(req, res, next)
    }
    
]

module.exports = { validateCreate }