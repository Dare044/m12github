const { verifyToken } = require('../helpers/generateToken')
const personalModel = require('../models/personals')

const checkCarrecAuth = (carrecs) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //TODO: 231231321
        const tokenData = await verifyToken(token)
        const personalData = await personalModel.findById(tokenData._id) //TODO: 696966

        //TODO ['personal'].includes('personal')
        if ([].concat(carrecs).includes(personalData.carrec)) { //TODO:
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }
}

module.exports = checkCarrecAuth