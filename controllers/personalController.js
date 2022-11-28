var Personal = require("../models/personal");

class PersonalController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_Personals = await Personal.find();
      res.render('personals/list',{list:list_Personals})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static create_get(req, res, next) {
    res.render('personals/new');
  }

  static create_post(req, res) {
    // console.log(req.body)
    Personal.create(req.body, function (error, newPersonal)  {
        if(error){
            //console.log(error)
            res.render('personals/new',{error:error.message})
        }else{             
            res.redirect('/personal')
        }
    })    
  }

  static update_get(req, res, next) {
    Personal.findById(req.params.id, function (err, personal) {
        if (err) {
          return next(err);
        }
        if (personal == null) {
          // No results.
          var err = new Error("Personal not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("personals/update", { personal: personal });
    });
      
  }  

  static update_post(req, res, next) {
      var personal = new Personal({
        Nom: req.body.Nom,
        Cognoms: req.body.Cognoms,
        Carrec: req.body.Carrec,
        contrasenya: req.body.contrasenya,
        Gmail: req.body.Gmail,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      Personal.findByIdAndUpdate(
        req.params.id,
        personal,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, personalFound) {
          if (err) {
            //return next(err);
            res.render("personals/update", { personal: personal, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("personals/update", { personal: personal, message: 'Personal Updated'});
        }
      );
  }

  static async delete_get(req, res, next) {
    res.render('personals/delete',{id: req.params.id})
 }

 static async delete_post(req, res, next) {
   
   Personal.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/personal')
     }else{
       res.redirect('/personal')
     }
   }) 
 }

  

}

module.exports = PersonalController;
