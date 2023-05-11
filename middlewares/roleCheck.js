const { verifyToken } = require('../helpers/generateToken')
const personalModel = require('../models/personal')
const carrecModel = require('../models/carrec');

const checkCarrecAuth = (carrec) => async (req, res, next) => {
    try {
        const token = req.session.token.split(' ').pop()
        const tokenData = await verifyToken(token)
        const personalData = await personalModel.findById(tokenData._id)

        const carrecsPersonal = await carrecModel.find({ _id: { $in: personalData.carrecs } });
        var check = false;

        carrecsPersonal.forEach((car) => {
            if (carrec.includes(car.nom)) {
                check = true;
            }
        });
        
        if (check) {
            next()
            console.log(personalData.carrecs)
        } else {
            res.render('home', { error: 'No tens permisos suficients per entrar' });
        }

    } catch (e) {
        console.log(e)
        res.render('home', { error: 'Hi ha hagut un problema' });
    }
}

module.exports = checkCarrecAuth