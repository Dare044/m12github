var LlistaCategoria = require("../models/llistaCategoria");
var LlistatProveidor = require("../models/llistatProveidor");

class LlistaCategoriaController {

  // Version 1
  static async list(req,res,next) {
    try {
      const page = parseInt(req.query.page) || 1; // Obtiene el número de página de la URL, por defecto 1
      const pageSize = 5; // Tamaño de página (cantidad de elementos por página)
      const skip = (page - 1) * pageSize;
  
      var list_LlistaCategories = await LlistaCategoria.find().skip(skip).limit(pageSize).exec();
      const totalCount = await LlistaCategoria.countDocuments(); // Obtiene la cantidad total de elementos para calcular la cantidad de páginas
      res.render('llistaCategories/list', { list: list_LlistaCategories, page, totalPages: Math.ceil(totalCount / pageSize) });  
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static create_get(req, res, next) {
    res.render('llistaCategories/new',{tipusProposta: "normal", errors:""});
  }

  static create_post(req, res) {
    // console.log(req.body)
    LlistaCategoria.create(req.body, function (error, newLlistaCategoria)  {
        if(error){
            console.log(error)
            res.render('llistaCategories/new',{error:error.message})
        }else{             
            res.redirect('/llistaCategoria')
        }
    })    
  }

  static create_getPropostaPressupost (req, res, next ) {
    res.render('llistaCategories/new',{tipusProposta: "pressupost", errors:""});
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
    res.render('llistaCategories/new',{tipusProposta: "necessitat", errors:""});
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
