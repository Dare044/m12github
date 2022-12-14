var FullComanda = require("../models/fullComanda");
var LlistatProveidor = require("../models/llistatProveidor");
var PropostaPressupost = require("../models/propostaPressupost");
var PropostaNecessitat = require("../models/propostaNecessitat");
var LlistaCategoria = require("../models/llistaCategoria");

class FullComandaController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_fullComandes = await FullComanda.find();
      var list_ProveidorsLlista = await LlistatProveidor.find();
      var list_LlistaCategoria = await LlistaCategoria.find();
      res.render('fullComandes/list',{list:list_fullComandes,
                                      list_LlistaCategoria:list_LlistaCategoria, 
                                      list_ProveidorsLlista:list_ProveidorsLlista, 
                                      list_fullComandes:list_fullComandes});   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

//   static create_get(req, res, next) {
//       res.render('genres/new');
//   }
  
//   static create_post(req, res) {
//     // console.log(req.body)
//     Genre.create(req.body, function (error, newGenre)  {
//         if(error){
//             //console.log(error)
//             res.render('genres/new',{error:error.message})
//         }else{             
//             res.redirect('/genres')
//         }
//     })    
//   }
  

//   static update_get(req, res, next) {
//     Genre.findById(req.params.id, function (err, genre) {
//         if (err) {
//           return next(err);
//         }
//         if (genre == null) {
//           // No results.
//           var err = new Error("Genre not found");
//           err.status = 404;
//           return next(err);
//         }
//         // Success.
//         res.render("genres/update", { genre: genre });
//     });
      
//   }  

//   static update_post(req, res, next) {
//       var genre = new Genre({
//         name: req.body.name,
//         _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
//       });    
    
//       Genre.findByIdAndUpdate(
//         req.params.id,
//         genre,
//         {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
//         function (err, genreFound) {
//           if (err) {
//             //return next(err);
//             res.render("genres/update", { genre: genre, error: err.message });

//           }          
//           //res.redirect('/genres/update/'+ genreFound._id);
//           res.render("genres/update", { genre: genre, message: 'Genre Updated'});
//         }
//       );
//   }

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
                                    tipusProposta:tipusProposta})
    
 }
}

module.exports = FullComandaController;
