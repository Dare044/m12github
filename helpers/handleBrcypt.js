// Aquesta línia importa el mòdul bcryptjs i l'assigna a la variable bcrypt
const bcrypt = require('bcryptjs')

// Aquesta funció asincrònica encripta el text pla que se li passa i retorna el hash resultant
const encrypt = async (textPlain) => {
    const hash = await bcrypt.hash(textPlain, 10)
    return hash
}

// Aquesta funció asincrònica compara una contrasenya en text pla amb el seu hash i retorna true si coincideixen, i false si no ho fan
const compare = async (contrasenyaPlain, hashContrasenya) => {
    return await bcrypt.compare(contrasenyaPlain, hashContrasenya)
}

// Aquest mòdul exporta les dues funcions anteriors perquè puguin ser utilitzades en altres parts de l'aplicació
module.exports = { encrypt, compare }