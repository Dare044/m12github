var Activitat = require("../models/activitat");

class ActivitatController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_Activitats = await Activitat.find();
      res.render('activitats/list',{list:list_Activitats})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static create_get(req, res, next) {
    res.render('activitats/new');
  }

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

  static async delete_get(req, res, next) {
    res.render('activitats/delete',{id: req.params.id})
 }

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
