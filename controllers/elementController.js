var PropostaPressupost = require("../models/propostaPressupost");
var PropostaNecessitat = require("../models/propostaNecessitat");
var LlistaCategoria = require("../models/llistaCategoria");
var FullComanda = require("../models/fullComanda");
var LlistatProveidor = require("../models/llistatProveidor");
var Element = require("../models/element");

var idFullComandaGuardat = null;
var idPropostaPressupostGuardat = null;
var idPropostaNecessitatGuardat = null;

var PropostaPressupostCostFinal = 0;
var PropostaNecessitatCostFinal = 0;

class ElementController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_Element = await Element.find();
      res.render('elements/list',{list_Element:list_Element});      
    }

    catch(e) {
      res.send('Error!');
    }          
  };

  static async create_getPropostaPressupost(req, res, next) {
    try {
      var list_Element = await Element.find();
      var list_LlistaCategoria = await LlistaCategoria.find()
      var list_LlistaProveidor = await LlistatProveidor.find();
      res.render('elements/newPressupost',{list_Element:list_Element, list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});   
    }
    
    catch(e) {
      res.send('Error!');
    }};
  
  static async create_getPropostaNecessitat(req, res, next) {
    try {
      var list_Element = await Element.find();
      var list_LlistaCategoria = await LlistaCategoria.find()
      var list_LlistaProveidor = await LlistatProveidor.find();
      res.render('elements/newNecessitat',{list_Element:list_Element, list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});   
    }
      
    catch(e) {
      res.send('Error!');
    }};

  static async create_postPropostaPressupost (req, res) {
    // Cas on només creas 1 proposta i la guardes
    if (idPropostaPressupostGuardat == null) {
      var FullComandaCreat = await FullComanda.create(req.body);
      idFullComandaGuardat = FullComandaCreat._id 
      var PropostaPressupostCreat = await PropostaPressupost.create(req.body);
      idPropostaPressupostGuardat = PropostaPressupostCreat._id // Puede que esto coja el valor de la anterior

      await Element.create(
      ({idConcepte: req.body.idConcepte,
        idProveidor: req.body.idProveidor,
        idPropostaPressupost: idPropostaPressupostGuardat,
        idPropostaNecessitat: null,
        nom: req.body.nom,
        quantitat: req.body.quantitat,
        descripcio: req.body.descripcio,
        objectiu: req.body.objectiu,
        valor: req.body.valor}),

      async function (error){
        if(error){
          res.render('elements/newPressupost',{error:error.message})
        }else{     
          
          // Propuesta + FullComanda
          PropostaPressupostCostFinal = (PropostaPressupostCostFinal) + Number(parseInt(req.body.valor));
          var date = new Date();
          var FullComandaCreatActualitzat = new FullComanda ({
            dataGeneracio: date,
            costFinal: PropostaPressupostCostFinal,
            _id: idFullComandaGuardat
          });

          await FullComanda.findByIdAndUpdate(idFullComandaGuardat, FullComandaCreatActualitzat);

          var PropostaPressupostPerTransferir = await new PropostaPressupost ({
            idFullComanda: idFullComandaGuardat,
            costTotal: PropostaPressupostCostFinal,
            _id: idPropostaPressupostGuardat,  // Necessari per a que sobreescrigui el mateix objecte!
          });    
          
          await PropostaPressupost.findByIdAndUpdate(idPropostaPressupostGuardat, PropostaPressupostPerTransferir);

          PropostaPressupostCostFinal = 0;
          idPropostaPressupostGuardat = null;

          var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
          var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
          var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);

          var llistaCategoriaPerTransferir = await new LlistaCategoria ({
            numDemanats: calculNumDemanats,
            costTotal: calculCostTotal,
            _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
          });

          await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);
          
          res.redirect('/element');
        }});

    } else {
      // Cas on venim de crear +1 proposta i es la última
      var FullComandaCreat = await FullComanda.create(req.body);
      idFullComandaGuardat = FullComandaCreat._id 
      await Element.create(
        ({idConcepte: req.body.idConcepte,
          idProveidor: req.body.idProveidor,
          idPropostaPressupost: idPropostaPressupostGuardat,
          idPropostaNecessitat: null,
          nom: req.body.nom,
          quantitat: req.body.quantitat,
          descripcio: req.body.descripcio,
          objectiu: req.body.objectiu,
          valor: req.body.valor}),

        async function (error)  {
          if(error){
            res.render('elements/newPressupost',{error:error.message})
          }else{       
          // Propuesta
            PropostaPressupostCostFinal = (PropostaPressupostCostFinal) + Number(parseInt(req.body.valor));
            var date = new Date();
            var FullComandaCreatActualitzat = new FullComanda ({
              dataGeneracio: date,
              costFinal: PropostaPressupostCostFinal,
              _id: idFullComandaGuardat
            });
  
            await FullComanda.findByIdAndUpdate(idFullComandaGuardat, FullComandaCreatActualitzat);

            var PropostaPressupostPerTransferir = new PropostaPressupost ({
            idFullComanda: idFullComandaGuardat,
            costTotal: PropostaPressupostCostFinal,
            _id: idPropostaPressupostGuardat,  // Necessari per a que sobreescrigui el mateix objecte!
            }); 
            
          await PropostaPressupost.findByIdAndUpdate(idPropostaPressupostGuardat, PropostaPressupostPerTransferir);

          PropostaPressupostCostFinal = 0;
          idPropostaPressupostGuardat = null;
          idFullComandaGuardat = null;
          
            var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
            var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
            var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);
  
            var llistaCategoriaPerTransferir = await new LlistaCategoria ({
              numDemanats: calculNumDemanats,
              costTotal: calculCostTotal,
              _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
            });
  
            await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);

            res.redirect('/element');;
          }})};
  };

  static async create_postPropostaNecessitat(req, res) {
    // Cas on només creas 1 proposta i la guardes
      if (idPropostaNecessitatGuardat == null) {
        var FullComandaCreat = await FullComanda.create(req.body);
        idFullComandaGuardat = FullComandaCreat._id 
        var PropostaNecessitatCreat = await PropostaNecessitat.create(req.body);
        idPropostaNecessitatGuardat = PropostaNecessitatCreat._id // Puede que esto coja el valor de la anterior

        await Element.create(
        ({idConcepte: req.body.idConcepte,
          idProveidor: req.body.idProveidor,
          idPropostaPressupost: null,
          idPropostaNecessitat: idPropostaNecessitatGuardat,
          nom: req.body.nom,
          quantitat: req.body.quantitat,
          descripcio: req.body.descripcio,
          objectiu: req.body.objectiu,
          valor: req.body.valor}),

        async function (error){
          if(error){
            res.render('elements/newNecessitat',{error:error.message})
          }else{     
            
            // Propuesta
            PropostaNecessitatCostFinal = (PropostaNecessitatCostFinal) + Number(parseInt(req.body.valor));
            var date = new Date();
            var FullComandaCreatActualitzat = new FullComanda ({
              dataGeneracio: date,
              costFinal: PropostaNecessitatCostFinal,
              _id: idFullComandaGuardat
            });
  
            await FullComanda.findByIdAndUpdate(idFullComandaGuardat, FullComandaCreatActualitzat);
  
            var PropostaNecessitatPerTransferir = new PropostaNecessitat ({
              idFullComanda: idFullComandaGuardat,
              costTotal: PropostaNecessitatCostFinal,
              _id: idPropostaNecessitatGuardat,  // Necessari per a que sobreescrigui el mateix objecte!
            });    
            
            await PropostaNecessitat.findByIdAndUpdate(idPropostaNecessitatGuardat, PropostaNecessitatPerTransferir);

            PropostaNecessitatCostFinal = 0;
            idPropostaNecessitatGuardat = null;

            var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
            var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
            var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);

            var llistaCategoriaPerTransferir = await new LlistaCategoria ({
              numDemanats: calculNumDemanats,
              costTotal: calculCostTotal,
              _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
            });

            await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);
            
            res.redirect('/element');
          }});

      } else {
        // Cas on venim de crear +1 proposta i es la última
        var FullComandaCreat = await FullComanda.create(req.body);
        idFullComandaGuardat = FullComandaCreat._id 

        await Element.create(
          ({idConcepte: req.body.idConcepte,
            idProveidor: req.body.idProveidor,
            idPropostaPressupost: null,
            idPropostaNecessitat: idPropostaNecessitatGuardat,
            nom: req.body.nom,
            quantitat: req.body.quantitat,
            descripcio: req.body.descripcio,
            objectiu: req.body.objectiu,
            valor: req.body.valor}),

          async function (error)  {
            if(error){
              res.render('elements/newNecessitat',{error:error.message})
            }else{       
            // Propuesta
              PropostaNecessitatCostFinal = (PropostaNecessitatCostFinal) + Number(parseInt(req.body.valor));
              var date = new Date();
              var FullComandaCreatActualitzat = new FullComanda ({
                dataGeneracio: date,
                costFinal: PropostaNecessitatCostFinal,
                _id: idFullComandaGuardat
              });
    
              await FullComanda.findByIdAndUpdate(idFullComandaGuardat, FullComandaCreatActualitzat);  

              var PropostaNecessitatPerTransferir = await new PropostaNecessitat ({
                idFullComanda: idFullComandaGuardat,
                costTotal: PropostaNecessitatCostFinal,
                _id: idPropostaNecessitatGuardat,  // Necessari per a que sobreescrigui el mateix objecte!
              
            }); 
              
            await PropostaNecessitat.findByIdAndUpdate(idPropostaNecessitatGuardat, PropostaNecessitatPerTransferir);

            PropostaNecessitatCostFinal = 0;
            idPropostaNecessitatGuardat = null;
            
              var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
              var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
              var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);
    
              var llistaCategoriaPerTransferir = await new LlistaCategoria ({
                numDemanats: calculNumDemanats,
                costTotal: calculCostTotal,
                _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
              });
    
              await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);

              res.redirect('/element');
            }})}};
  
  static async create_postMorePropostaPressupost (req, res) {
    // Es la primera de muchas
    if (idPropostaPressupostGuardat == null) {
      var PropostaPressupostCreat = await PropostaPressupost.create(req.body);
      idPropostaPressupostGuardat = PropostaPressupostCreat._id // Puede que esto coja el valor de la anterior
      await Element.create(
        ({idConcepte: req.body.idConcepte,
          idProveidor: req.body.idProveidor,
          idPropostaPressupost: idPropostaPressupostGuardat,
          idPropostaNecessitat: null,
          nom: req.body.nom,
          quantitat: req.body.quantitat,
          descripcio: req.body.descripcio,
          objectiu: req.body.objectiu,
          valor: req.body.valor}),

      async function (error)  {
        if(error){
            res.render('elements/newPressupost',{error:error.message})
        }else{             
          var list_LlistaCategoria = await LlistaCategoria.find();
          var list_LlistaProveidor = await LlistatProveidor.find();
          
          PropostaPressupostCostFinal = (PropostaPressupostCostFinal) + Number(parseInt(req.body.valor));
          res.render('elements/newPressupost',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});
                
          var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
          var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
          var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);

          var llistaCategoriaPerTransferir = await new LlistaCategoria ({
            numDemanats: calculNumDemanats,
            costTotal: calculCostTotal,
            _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
          });

          await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);
        }
        });

    } else {
      // Una de muchas
      await Element.create(
        ({idConcepte: req.body.idConcepte,
          idProveidor: req.body.idProveidor,
          idPropostaPressupost: idPropostaPressupostGuardat,
          idPropostaNecessitat: null,
          nom: req.body.nom,
          quantitat: req.body.quantitat,
          descripcio: req.body.descripcio,
          objectiu: req.body.objectiu,
          valor: req.body.valor}),

        async function (error)  {
          if(error){
              res.render('elements/newPressupost',{error:error.message})
          }else{             
            var list_LlistaCategoria = await LlistaCategoria.find();
            var list_LlistaProveidor = await LlistatProveidor.find();
            PropostaPressupostCostFinal = (PropostaPressupostCostFinal) + Number(parseInt(req.body.valor));
            res.render('elements/newPressupost',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});
            
            var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
            var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
            var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);
  
            var llistaCategoriaPerTransferir = await new LlistaCategoria ({
              numDemanats: calculNumDemanats,
              costTotal: calculCostTotal,
              _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
            });
  
            await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);

          }
          });
    }};

  static async create_postMorePropostaNecessitat(req, res) {
      
      // Es la primera de muchas
        if (idPropostaNecessitatGuardat == null) {
          var PropostaNecessitatCreat = await PropostaNecessitat.create(req.body);
          idPropostaNecessitatGuardat = PropostaNecessitatCreat._id // Puede que esto coja el valor de la anterior

          await Element.create(
            ({idConcepte: req.body.idConcepte,
              idProveidor: req.body.idProveidor,
              idPropostaPressupost: null,
              idPropostaNecessitat: idPropostaNecessitatGuardat,
              nom: req.body.nom,
              quantitat: req.body.quantitat,
              descripcio: req.body.descripcio,
              objectiu: req.body.objectiu,
              valor: req.body.valor}),

          async function (error)  {
            if(error){
                res.render('elements/newNecessitat',{error:error.message})
            }else{             
              var list_LlistaCategoria = await LlistaCategoria.find();
              var list_LlistaProveidor = await LlistatProveidor.find();

              PropostaNecessitatCostFinal = (PropostaNecessitatCostFinal) + Number(parseInt(req.body.valor));
              res.render('elements/newNecessitat',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});
              
              var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
              var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
              var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);
    
              var llistaCategoriaPerTransferir = await new LlistaCategoria ({
                numDemanats: calculNumDemanats,
                costTotal: calculCostTotal,
                _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
              });
    
              await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);
            }
            });

        } else {
          // Una de muchas
          await Element.create(
            ({idConcepte: req.body.idConcepte,
              idProveidor: req.body.idProveidor,
              idPropostaPressupost: null,
              idPropostaNecessitat: idPropostaNecessitatGuardat,
              nom: req.body.nom,
              quantitat: req.body.quantitat,
              descripcio: req.body.descripcio,
              objectiu: req.body.objectiu,
              valor: req.body.valor}),

            async function (error)  {
              if(error){
                  res.render('elements/newNecessitat',{error:error.message})
              }else{             
                var list_LlistaCategoria = await LlistaCategoria.find();
                var list_LlistaProveidor = await LlistatProveidor.find();
                PropostaNecessitatCostFinal = (PropostaNecessitatCostFinal) + Number(parseInt(req.body.valor));
                res.render('elements/newNecessitat',{list_LlistaCategoria:list_LlistaCategoria, list_LlistaProveidor:list_LlistaProveidor});
                
                var llistaCategoriaPerActualitzar = await LlistaCategoria.findById(req.body.idConcepte);
                var calculNumDemanats = Number(llistaCategoriaPerActualitzar.numDemanats) + Number(req.body.quantitat);
                var calculCostTotal = Number(llistaCategoriaPerActualitzar.costTotal) + Number(req.body.valor);
      
                var llistaCategoriaPerTransferir = await new LlistaCategoria ({
                  numDemanats: calculNumDemanats,
                  costTotal: calculCostTotal,
                  _id: req.body.idConcepte,  // Necessari per a que sobreescrigui el mateix objecte!
                });
      
                await LlistaCategoria.findByIdAndUpdate(req.body.idConcepte, llistaCategoriaPerTransferir);

              }});
        }}; 

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

  static async delete_get(req, res, next) {
    res.render('elements/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
    
    Element.findByIdAndRemove(req.params.id, function (error) {
      if(error){
        res.redirect('/element')
      }else{
        res.redirect('/element')
      }
    }) 
  }

  static async show_get(req, res, next) {
    var element = await Element.findById(req.params.id);
    res.render('elements/show',{element:element});
    
 }

  
}

module.exports = ElementController;
