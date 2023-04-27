var Personal = require("../models/personal");

class PersonalController {

  // Version 1
  static async list(req, res, next) {
    try {
      const page = parseInt(req.query.page) || 1; // Obtiene el número de página de la URL, por defecto 1
      const pageSize = 5; // Tamaño de página (cantidad de elementos por página)
      const skip = (page - 1) * pageSize;
  
      var list_Personals = await Personal.find().skip(skip).limit(pageSize).exec();
      const totalCount = await Personal.countDocuments(); // Obtiene la cantidad total de elementos para calcular la cantidad de páginas
      res.render('personals/list', { list: list_Personals, page, totalPages: Math.ceil(totalCount / pageSize) });
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
