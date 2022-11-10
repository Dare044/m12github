var PropostaPressupost = require("../models/propostaPressupost");
var LlistaCategoria = require("../models/llistaCategoria");
var FullComanda = require("../models/fullComanda");


class PropostaPressupostController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_PropostesPressupost = await PropostaPressupost.find().sort('prioritat');
      var list_LlistaCategoria = await LlistaCategoria.find();
      res.render('propostesPressupost/list',{list:list_PropostesPressupost, list_LlistaCategoria:list_LlistaCategoria})      
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
    FullComanda.create(req.body);

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

  static update_get(req, res, next) {
    PropostaPressupost.findById(req.params.id, function (err, propostaPressupost) {
        if (err) {
          return next(err);
        }
        if (propostaPressupost == null) {
          // No results.
          var err = new Error("Proposta de Pressupost not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("propostesPressupost/update", { propostaPressupost: propostaPressupost });
    });
      
  }  

  static update_post(req, res, next) {
      var propostaPressupost = new PropostaPressupost ({
        prioritat: req.body.prioritat,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      PropostaPressupost.findByIdAndUpdate(
        req.params.id,
        propostaPressupost,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, propostaPressupostFound) {
          if (err) {
            //return next(err);
            res.render("propostesPressupost/update", { propostaPressupost: propostaPressupost, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("propostesPressupost/update", { propostaPressupost: propostaPressupost, message: 'Personal Updated'});
        }
      );
  }



  
}

module.exports = PropostaPressupostController;
