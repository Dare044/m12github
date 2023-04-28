const { verifyToken } = require('../helpers/generateToken')
const personalModel = require('../models/personal')
const carrecModel = require('../models/carrec');

const checkCarrecAuth = (carrec) => async (req, res, next) => {
    try {
        const token = req.session.token.split(' ').pop() //TODO: 231231321
        const tokenData = await verifyToken(token)
        const personalData = await personalModel.findById(tokenData._id) //TODO: 696966
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
            res.render('home', { error: 'No tienes permisos suficientes para entrar ahí' });
        }

        // if (personalData.carrecs.includes(carrec)) { //TODO:
        //     next()
        //     console.log(personalData.carrecs)
        // } else {
        //     res.render('home', { error: 'No tienes permisos suficientes para entrar ahí' });
        // }

    } catch (e) {
        console.log(e)
        res.render('home', { error: 'Hi ha hagut un problema' });
    }
}

module.exports = checkCarrecAuth