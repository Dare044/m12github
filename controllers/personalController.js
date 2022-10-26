var Personal = require("../models/personal");

class PersonalController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_Personals = await Personal.find();
      res.render('personals/list',{list:list_Personals})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  

}

module.exports = PersonalController;
