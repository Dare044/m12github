var LlistaCategoria = require("../models/llistaCategoria");
var LlistatProveidor = require("../models/llistatProveidor");

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
    res.render('llistaCategories/new',{tipusProposta: "normal"});
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

  static create_getPropostaPressupost (req, res, next ) {
    res.render('llistaCategories/new',{tipusProposta: "pressupost"});
  }

  static create_postPropostaPressupost (req, res, next) {
    LlistaCategoria.create(req.body, async function (error, newLlistaCategoria)  {
      if(error){
          //console.log(error)
          res.render('llistaCategories/new',{error:error.message})
      }else{             
        var list_LlistaCategoria = await LlistaCategoria.find();
        var list_LlistaProveidor = await LlistatProveidor.find();
        res.render('propostesPressupost/new',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor}); 
      }
  })  
  }

  static create_getPropostaNecessitat (req, res, next ) {
    res.render('llistaCategories/new',{tipusProposta: "necessitat"});
  }

  static create_postPropostaNecessitat (req, res, next) {
    LlistaCategoria.create(req.body, function (error, newLlistaCategoria)  {
      if(error){
          //console.log(error)
          res.render('llistaCategories/new',{error:error.message})
      }else{             
          res.render('propostesNecessitat/new')
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
