const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async (req, res, next) => {
    try {
        const token = req.session.token 
        const tokenData = await verifyToken(token)
        if (tokenData._id) {
            next()
        } else {
            res.render('login/singin', { error: 'No has iniciado sesión!' });
        }

    } catch (e) {
        res.render('login/singin', { error: 'No has iniciado sesión!' });
    }

}

module.exports = checkAuth