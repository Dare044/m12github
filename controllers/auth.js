const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBrcypt')
const { tokenSign } = require('../helpers/generateToken')
const personalModel = require('../models/personal')

//TODO: Login!
const loginCtrl = async (req, res) => {
    try {
        const { gmail, contrasenya } = req.body
        const personal = await personalModel.findOne({ gmail })

        if (!personal) {
            res.render('login/singin', { error: 'El compte no existeix!' });
        }

        const checkContrasenya = await compare(contrasenya, personal.contrasenya) //TODO: Contraseña!

        const tokenSession = await tokenSign(personal) //TODO: 2d2d2d2d2d2d2

        if (checkContrasenya) { //TODO Contraseña es correcta!
            req.session.token = tokenSession // guardar el token en la sesión
            res.redirect('/');
            return
        }


        if (!checkContrasenya) {
            res.render('login/singin', { error: 'Contrasenya invalida!' });
        }

    } catch (e) {
        httpError(res, e)
    }
}

//TODO: Registramos usuario!
const registerCtrl = async (req, res) => {
    try {
        //TODO: Datos que envias desde el front (postman)
        const { gmail, contrasenya, nom } = req.body

        const contrasenyaHash = await encrypt(contrasenya) //TODO: (123456)<--- Encriptando!!
        const registerPersonal = await personalModel.create({
            gmail,
            nom,
            contrasenya: contrasenyaHash
        })

        res.send({ data: registerPersonal })

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { loginCtrl, registerCtrl }