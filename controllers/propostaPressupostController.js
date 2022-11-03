var PropostaPressupost = require("../models/propostaPressupost");
var LlistaCategoria = require("../models/llistaCategoria");

class PropostaPressupostController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_PropostesPressupost = await PropostaPressupost.find();
      res.render('propostesPressupost/list',{list:list_PropostesPressupost})      
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static async create_get(req, res, next) {
    try {
      var list_LlistaCategoria = await LlistaCategoria.find();
      res.render('propostesPressupost/new',{llistaCategoriaList:list_LlistaCategoria});   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static create_post(req, res) {
    // console.log(req.body)
    PropostaPressupost.create(req.body, function (error, newPropostaPressupost)  {
        if(error){
            //console.log(error)
            res.render('propostesPressupost/new',{error:error.message})
        }else{             
            res.redirect('/propostaPressupost')
        }
    })    
  }

  static async delete_get(req, res, next) {
    res.render('propostesPressupost/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
   
   PropostaPressupost.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/propostaPressupost')
     }else{
       res.redirect('/propostaPressupost')
     }
   }) 
  }

  
}

module.exports = PropostaPressupostController;
