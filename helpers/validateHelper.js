const { validationResult } = require('express-validator');

const validateResult = (req, res, next) => {
    try {
        validationResult(req).throw()
        return next()
    } catch (err) {
        console.log(err)
        // res.status(403)
        // res.send({errors: err.array()})
    }
}

module.exports = { validateResult }

// Si no es compleix una validació ens avisa