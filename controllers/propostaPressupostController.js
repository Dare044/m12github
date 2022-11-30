var PropostaPressupost = require("../models/propostaPressupost");
var LlistaCategoria = require("../models/llistaCategoria");
var FullComanda = require("../models/fullComanda");
var LlistatProveidor = require("../models/llistatProveidor");
var idFullComandaGuardat = null;

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
      var list_LlistaProveidor = await LlistatProveidor.find();
      res.render('propostesPressupost/new',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static async create_post(req, res) {
    if (idFullComandaGuardat == null) {
      var FullComandaCreat = await FullComanda.create(req.body);
      idFullComandaGuardat = FullComandaCreat._id
      await PropostaPressupost.create(
      ({idConcepte: req.body.idConcepte, 
        idFullComanda: (FullComandaCreat._id),
        descripcio: req.body.descripcio,
        objectiu: req.body.objectiu,
        quantitat: req.body.quantitat,
        valor: req.body.valor,
        prioritat: req.body.prioritat,
        estat: req.body.estat}), 
      function (error, newPropostaPressupost)  {
        if(error){
            res.render('propostesPressupost/new',{error:error.message})
        }else{             
            res.redirect('/propostaPressupost')
        }
        });

    } else {
      await PropostaPressupost.create(
        ({idConcepte: req.body.idConcepte, 
          idFullComanda: (idFullComandaGuardat),
          descripcio: req.body.descripcio,
          objectiu: req.body.objectiu,
          quantitat: req.body.quantitat,
          valor: req.body.valor,
          prioritat: req.body.prioritat,
          estat: req.body.estat}), 
        function (error, newPropostaPressupost)  {
          if(error){
            res.render('propostesPressupost/new',{error:error.message})
          }else{             
            idFullComandaGuardat = null;  
            res.redirect('/propostaPressupost');
          }
          });
    }
    } 
  
    static async create_postMore(req, res) {
      
      if (idFullComandaGuardat == null) {
        var FullComandaCreat = await FullComanda.create(req.body);
        idFullComandaGuardat = FullComandaCreat._id
        await PropostaPressupost.create(
        ({idConcepte: req.body.idConcepte, 
          idFullComanda: (FullComandaCreat._id),
          descripcio: req.body.descripcio,
          objectiu: req.body.objectiu,
          quantitat: req.body.quantitat,
          valor: req.body.valor,
          prioritat: req.body.prioritat,
          estat: req.body.estat}), 
        async function (error, newPropostaPressupost)  {
          if(error){
              res.render('propostesPressupost/new',{error:error.message})
          }else{             
            var list_LlistaCategoria = await LlistaCategoria.find();
            var list_LlistaProveidor = await LlistatProveidor.find();
            res.render('propostesPressupost/new',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});
          }
          });

      } else {
        await PropostaPressupost.create(
          ({idConcepte: req.body.idConcepte, 
            idFullComanda: (idFullComandaGuardat),
            descripcio: req.body.descripcio,
            objectiu: req.body.objectiu,
            quantitat: req.body.quantitat,
            valor: req.body.valor,
            prioritat: req.body.prioritat,
            estat: req.body.estat}), 
          async function (error, newPropostaPressupost)  {
            if(error){
                res.render('propostesPressupost/new',{error:error.message})
            }else{             
              var list_LlistaCategoria = await LlistaCategoria.find();
              var list_LlistaProveidor = await LlistatProveidor.find();
              res.render('propostesPressupost/new',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});
            }
            });
      }
      
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

  static updateEstat_get(req, res, next) {
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
        res.render("propostesPressupost/updateEstat", { propostaPressupost: propostaPressupost });
    });
      
  }  

  static updateEstat_post(req, res, next) {
      var propostaPressupost = new PropostaPressupost ({
        estat: req.body.estat,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      PropostaPressupost.findByIdAndUpdate(
        req.params.id,
        propostaPressupost,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, propostaPressupostFound) {
          if (err) {
            //return next(err);
            res.render("propostesPressupost/updateEstat", { propostaPressupost: propostaPressupost, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("propostesPressupost/updateEstat", { propostaPressupost: propostaPressupost, message: 'Personal Updated'});
        }
      );
  }



  
}

module.exports = PropostaPressupostController;
