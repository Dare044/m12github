var FullComanda = require("../models/fullComanda");

class FullComandaController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_fullComandes = await FullComanda.find();
      res.render('fullComandes/list',{list:list_fullComandes})   
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

//   static async delete_get(req, res, next) {
//      res.render('genres/delete',{id: req.params.id})
//   }

//   static async delete_post(req, res, next) {
    
//     Genre.findByIdAndRemove(req.params.id, function (error) {
//       if(error){
//         res.redirect('/genres')
//       }else{
//         res.redirect('/genres')
//       }
//     }) 
//   }

}

module.exports = FullComandaController;
