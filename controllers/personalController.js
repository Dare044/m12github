var Personal = require("../models/personal");

class PersonalController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_personals = await Personal.find();
      res.render('personals/list',{list:list_personals})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  

}

module.exports = PersonalController;
