const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBrcypt')
const { tokenSign } = require('../helpers/generateToken')
const personalModel = require('../models/personal')

// Aquesta funció controladora és responsable de gestionar el procés d'inici de sessió de l'usuari.
const loginCtrl = async (req, res) => {
    try {
        const { gmail, contrasenya } = req.body
        const personal = await personalModel.findOne({ gmail })

        // Si l'usuari no existeix, es redirigeix a la pàgina de login amb un missatge d'error.
        if (!personal) {
            res.render('login/singin', { error: 'El compte no existeix!' });
        }

        // Es comprova si la contrasenya proporcionada coincideix amb la contrasenya de l'usuari a la base de dades.
        const checkContrasenya = await compare(contrasenya, personal.contrasenya)

        // Si la contrasenya és correcta, es crea un nou token de sessió per a l'usuari i es redirigeix a la pàgina principal de l'aplicació.
        if (checkContrasenya) {
            const tokenSession = await tokenSign(personal)
            req.session.token = tokenSession
            res.redirect('/');
            // console.log(req.session);
            return
        }

        // Si la contrasenya és incorrecta, es redirigeix a la pàgina de login amb un missatge d'error.
        if (!checkContrasenya) {
            res.render('login/singin', { error: 'Contrasenya invalida!' });
        }

    } catch (e) {
        httpError(res, e)
    }
}

// Aquesta funció controladora és responsable de gestionar el procés de registre de l'usuari.
const registerCtrl = async (req, res) => {
    try {
        const { gmail, contrasenya, nom } = req.body

        // Es xifra la contrasenya i es crea un nou usuari a la base de dades.
        const contrasenyaHash = await encrypt(contrasenya)
        const registerPersonal = await personalModel.create({
            gmail,
            nom,
            contrasenya: contrasenyaHash
        })

        // Es retorna la informació de l'usuari registrat.
        res.send({ data: registerPersonal })

    } catch (e) {
        httpError(res, e)
    }
}

module.exports = { loginCtrl, registerCtrl }