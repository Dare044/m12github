var FullComanda = require("../models/fullComanda");
var PropostaPressupost = require("../models/propostaPressupost");
var PropostaNecessitat = require("../models/propostaNecessitat");
var LlistaCategoria = require("../models/llistaCategoria");
var LlistatProveidor = require("../models/llistatProveidor");

class FullComandaController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_fullComandes = await FullComanda.find();
      var list_LlistaCategoria = await LlistaCategoria.find();
      res.render('fullComandes/list',{list:list_fullComandes,
                                      list_LlistaCategoria:list_LlistaCategoria, 
                                      list_fullComandes:list_fullComandes});   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static async delete_get(req, res, next) {
    res.render('fullComandes/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
    
    FullComanda.findByIdAndRemove(req.params.id, function (error) {
      if(error){
        res.redirect('/fullComanda')
      }else{
        res.redirect('/fullComanda')
      }
    }) 
  }

  static async show_get(req, res, next) {
    var list_propostaNecessitat = await PropostaNecessitat.find();
    var list_propostaPressupost = await PropostaPressupost.find();
    var list_ProveidorsLlista = await LlistatProveidor.find();
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
                                    list_propostaPressupost:list_propostaPressupost , 
                                    list_LlistaCategoria:list_LlistaCategoria,
                                    list_ProveidorsLlista:list_ProveidorsLlista,
                                    tipusProposta:tipusProposta})
    
 }
}

module.exports = FullComandaController;
