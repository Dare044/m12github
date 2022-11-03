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

  static create_get(req, res, next) {
    res.render('llistaCategories/new');
  }

  static create_post(req, res) {
    // console.log(req.body)
    LlistaCategoria.create(req.body, function (error, newLlistaCategoria)  {
        if(error){
            //console.log(error)
            res.render('llistaCategories/new',{error:error.message})
        }else{             
            res.redirect('/llistaCategoria')
        }
    })    
  }

  static async delete_get(req, res, next) {
    res.render('llistaCategories/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
   
   LlistaCategoria.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/llistaCategoria')
     }else{
       res.redirect('/llistaCategoria')
     }
   }) 
  }

  
}

module.exports = LlistaCategoriaController;
