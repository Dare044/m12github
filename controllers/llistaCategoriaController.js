var LlistaCategoria = require("../models/llistaCategoria");

class LlistaCategoriaController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_LlistaCategories = await LlistaCategoria.find();
      res.render('llistaCategories/list',{list:list_LlistaCategories})      
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  
}

module.exports = LlistaCategoriaController;
