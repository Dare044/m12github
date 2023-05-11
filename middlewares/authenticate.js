// Aquesta funció middleware comprova si l'usuari ha iniciat sessió. Si la variable de sessió "data" no existeix, es redirigeix a la pàgina de login. Si la variable existeix, la funció next() s'executa per passar el control a la següent funció middleware.
exports.isAuth = function (req, res, next) {
    
    // Comprova si existeix la variable data en la session
    if(!req.session.data) {
        res.redirect('/auth/login')
    }
    else {       
      next();  
    }   
}

// Aquesta funció retorna una funció middleware que comprova si l'usuari té el rol especificat per a accedir a una ruta. 
// Si l'usuari té el rol, s'executa la funció next() per passar el control a la següent funció middleware.
// Si l'usuari no té el rol o si el rol no és una cadena o un array, es genera un error 401.
exports.hasRole = function  (role)  {
    return function (req, res, next)  {

        if(req.session.data.role instanceof Array) {
            if( req.session.data.role.includes(role)) return next();
           
            // error insuficients privilegis
            var err = new Error("You don't have suficient privileges to do this action.");
            err.status = 401;             
            return next(err);
            
        }
        else {
                if( req.session.data.role == role) return next();                
                // error insuficients privilegis
                var err = new Error("You don't have suficient privileges to do this action.");
                err.status = 401;             
                return next(err);
                
        }
    }
}

// Aquesta línia no és necessària i és un error, ja que està sobrescrivint la funció isAuth que ja s'ha definit a l'inici del fitxer. Aquesta línia es pot eliminar.
module.exports = isAuth;