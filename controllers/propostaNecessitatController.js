var PropostaNecessitat = require("../models/propostaNecessitat");
var FullComanda = require("../models/fullComanda");
var LlistatProveidor = require("../models/llistatProveidor");
var Personal = require("../models/personal");
var Element = require("../models/element");
var idFullComandaGuardat = null;
var FullComandaCostFinal = 0;

class PropostaNecessitatController {

    static async list(req,res,next) {
        try {
          var list_propostesNecessitat = await PropostaNecessitat.find();
          var list_ProveidorsLlista = await LlistatProveidor.find();
          var list_Personal = await Personal.find();
          res.render('propostesNecessitat/list',{list:list_propostesNecessitat,list_ProveidorsLlista:list_ProveidorsLlista, list_Personal:list_Personal})   
        }
        catch(e) {
          res.send('Error!');
        }          
      }

  static async create_get(req, res, next) {
    try {
      var list_LlistaProveidor = await LlistatProveidor.find();
      res.render('propostesNecessitat/new',{list_LlistaProveidor:list_LlistaProveidor});   

    }
    catch(e) {
      res.send('Error!');
    }
  }

  static async create_post(req, res) {
    if (idFullComandaGuardat == null) {
      var FullComandaCreat = await FullComanda.create(req.body);
      idFullComandaGuardat = FullComandaCreat._id
      await PropostaNecessitat.create(
        ({idFullComanda: (FullComandaCreat._id),
          idProveidor: req.body.idProveidor,
          material: req.body.material,
          preu: req.body.preu,
          quantitat: req.body.quantitat,
          estat: req.body.estat}), 
        async function (error)  {
          if(error){
              res.render('propostesNecessitat/new',{error:error.message})
          }else{             
              FullComandaCostFinal = (FullComandaCostFinal) + Number(parseInt(req.body.preu));
              var FullComandaPerTransferir = await new FullComanda ({
                costFinal: FullComandaCostFinal,
                _id: idFullComandaGuardat,  // Necessari per a que sobreescrigui el mateix objecte!
              });    
              
              await FullComanda.findByIdAndUpdate(idFullComandaGuardat, FullComandaPerTransferir);
    
              FullComandaCostFinal = 0;
              idFullComandaGuardat = null;

              res.redirect('/propostaNecessitat')
          }
          });

    } else {
      await PropostaNecessitat.create(
        ({idFullComanda: (idFullComandaGuardat),
          material: req.body.material,
          preu: req.body.preu,
          quantitat: req.body.quantitat,
          estat: req.body.estat}), 
        async function (error, newPropostaNecessitat)  {
          if(error){
              res.render('propostesNecessitat/new',{error:error.message})
          }else{    
            FullComandaCostFinal = (FullComandaCostFinal) + Number(parseInt(req.body.preu));
            var FullComandaPerTransferir = await new FullComanda ({
              costFinal: FullComandaCostFinal,
              _id: idFullComandaGuardat,  // Necessari per a que sobreescrigui el mateix objecte!
            });    
            
            await FullComanda.findByIdAndUpdate(idFullComandaGuardat, FullComandaPerTransferir);
  
            FullComandaCostFinal = 0;
            idFullComandaGuardat = null;  

            res.redirect('/propostaNecessitat')
          }
          });
    }
    } 
  
    static async create_postMore(req, res) {
      
      if (idFullComandaGuardat == null) {
        var FullComandaCreat = await FullComanda.create(req.body);
        idFullComandaGuardat = FullComandaCreat._id
        await PropostaNecessitat.create(
          ({idFullComanda: (FullComandaCreat._id),
            material: req.body.material,
            preu: req.body.preu,
            quantitat: req.body.quantitat,
            estat: req.body.estat}), 
          async function (error, newPropostaNecessitat)  {
          if(error){
              res.render('propostesNecessitat/new',{error:error.message})
          }else{             
            var list_LlistaProveidor = await LlistatProveidor.find();
            FullComandaCostFinal = (FullComandaCostFinal) + Number(parseInt(req.body.preu));

            res.render('propostesNecessitat/new',{list_LlistaProveidor:list_LlistaProveidor});
          }
          });

      } else {
        await PropostaNecessitat.create(
          ({idFullComanda: (idFullComandaGuardat),
            material: req.body.material,
            preu: req.body.preu,
            quantitat: req.body.quantitat,
            estat: req.body.estat}), 
          async function (error, newPropostaNecessitat)  {
            if(error){
                res.render('propostesNecessitat/new',{error:error.message})
            }else{             
              var list_LlistaProveidor = await LlistatProveidor.find();
              FullComandaCostFinal = (FullComandaCostFinal) + Number(parseInt(req.body.preu));
              
              res.render('propostesNecessitat/new',{list_LlistaProveidor:list_LlistaProveidor});
            }
            });
      }
      
      }

  
  static async delete_get(req, res, next) {
    res.render('propostesNecessitat/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
   
   PropostaNecessitat.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/propostaNecessitat')
     }else{
       res.redirect('/propostaNecessitat')
     }
   }) 
  }

  static updateEstat_get(req, res, next) {
    PropostaNecessitat.findById(req.params.id, function (err, propostaNecessitat) {
        if (err) {
          return next(err);
        }
        if (propostaNecessitat == null) {
          // No results.
          var err = new Error("Proposta de Necessitat not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("propostesNecessitat/updateEstat", { propostaNecessitat: propostaNecessitat });
    });
      
  }  

  static updateEstat_post(req, res, next) {
      var propostaNecessitat = new PropostaNecessitat ({
        estat: req.body.estat,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      PropostaNecessitat.findByIdAndUpdate(
        req.params.id,
        propostaNecessitat,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, propostaNecessitatFound) {
          if (err) {
            //return next(err);
            res.render("propostesNecessitat/updateEstat", { propostaNecessitat: propostaNecessitat, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("propostesNecessitat/updateEstat", { propostaNecessitat: propostaNecessitat, message: 'Personal Updated'});
        }
      );
  }

  static async show_get(req, res, next) {
    var list_propostaNecessitat = await PropostaNecessitat.find();
    var list_ProveidorsLlista = await LlistatProveidor.find();
    var list_Element = await Element.find();
    var tipusProposta = "";
    list_propostaNecessitat.forEach(function(propostaNecessitat) {
      if (propostaNecessitat.idFullComanda == req.params.id) {
        tipusProposta = "PropostaDeNecessitat";
      } else {
        tipusProposta = "PropostaDePressupost";
      }
    });

    var list_LlistaCategoria = await LlistaCategoria.find();
    res.render('fullComandes/show',{id: req.params.id, 
                                    list_propostaNecessitat:list_propostaNecessitat, 
                                    list_LlistaCategoria:list_LlistaCategoria,
                                    list_Element:list_Element,
                                    list_ProveidorsLlista:list_ProveidorsLlista,
                                    tipusProposta:tipusProposta})
    
 }

  
}

module.exports = PropostaNecessitatController;
