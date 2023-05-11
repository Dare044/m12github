// Aquesta línia importa el mòdul jsonwebtoken i l'assigna a la variable jwt
const jwt = require('jsonwebtoken')

// Aquesta funció asincrònica crea i retorna un token de signatura per a un usuari específic
const tokenSign = async (personal) => {
    return jwt.sign(
        {
            _id: personal._id, 
            carrecs: personal.carrecs
        }, 
        process.env.JWT_SECRET,  
        {
            expiresIn: "2h",
        }
    );
}

// Aquesta funció asincrònica comprova si un token és vàlid i retorna el seu contingut si ho és, i null si no ho és
const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

// Aquesta funció descodifica el contingut d'un token i el retorna
const decodeSign = (token) => { 
    return jwt.decode(token, null)
}

// Aquest mòdul exporta les tres funcions anteriors perquè puguin ser utilitzades en altres parts de l'aplicació
module.exports = { tokenSign, decodeSign, verifyToken }