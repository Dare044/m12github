const Personal = require("../models/personal");
const Carrec = require("../models/carrec");
const bcrypt = require('bcrypt'); // Esto y lo de abajo es para la contraseña
const asyncHandler = require('express-async-handler') //
class LoginController {



  // Version 1
  static async showVista(req,res,next) {
    res.render('login/singin');

  }

 

  

}

module.exports = LoginController;
