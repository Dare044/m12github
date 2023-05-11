var Activitat = require("../models/activitat");

// Aquesta és una classe que conté diferents mètodes per a la gestió d'activitats. Aquesta classe s'utilitza com a controlador en el nostre servidor Node.js.

class ActivitatController {

  // Aquest mètode llista totes les activitats i les mostra a la pàgina activitats/list
  static async list(req,res,next) {
    try {
      var list_Activitats = await Activitat.find();
      res.render('activitats/list',{list:list_Activitats})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  // Aquest mètode mostra el formulari per crear una nova activitat a la pàgina activitats/new
  static create_get(req, res, next) {
    res.render('activitats/new');
  }

  // Aquest mètode crea una nova activitat i la redirigeix a la pàgina activitats/list
  static create_post(req, res) {
    // console.log(req.body)
    Activitat.create(req.body, function (error, newActivitat)  {
        if(error){
            //console.log(error)
            res.render('activitats/new',{error:error.message})
        }else{             
            res.redirect('/activitat')
        }
    })    
  }

  // Aquest mètode mostra el formulari per actualitzar una activitat específica a la pàgina activitats/update
  static update_get(req, res, next) {
    Activitat.findById(req.params.id, function (err, activitat) {
        if (err) {
          return next(err);
        }
        if (activitat == null) {
          // No results.
          var err = new Error("Activitat not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("activitats/update", { activitat: activitat });
    });
      
  }  

  // Aquest mètode actualitza una activitat específica i la redirigeix a la pàgina activitats/update amb un missatge de confirmació
  static update_post(req, res, next) {
      var activitat = new Activitat({
        Nom: req.body.Nom,
        Descripcio: req.body.Descripcio,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      Activitat.findByIdAndUpdate(
        req.params.id,
        activitat,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, personalFound) {
          if (err) {
            //return next(err);
            res.render("activitats/update", { activitat: activitat, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("activitats/update", { activitat: activitat, message: 'Activitat Updated'});
        }
      );
  }

  // Aquest mètode mostra el formulari per eliminar una activitat específica a la pàgina activitats/delete
  static async delete_get(req, res, next) {
    res.render('activitats/delete',{id: req.params.id})
 }

  // Aquest mètode elimina una activitat específica i la redirigeix a la pàgina activitats
 static async delete_post(req, res, next) {
   
   Activitat.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/activitat')
     }else{
       res.redirect('/activitat')
     }
   }) 
 }

}

module.exports = ActivitatController;
