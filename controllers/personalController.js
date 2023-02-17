var Personal = require("../models/personal");
var Carrec = require("../models/carrec");

class PersonalController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_Personals = await Personal.find();
      var carrec_list = await Carrec.find()
      res.render('personals/list',{list:list_Personals,carrec_list:carrec_list})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static async create_get(req, res, next) {
    var carrec_list = await Carrec.find();
    res.render('personals/new',{carrec_list:carrec_list, errors:"", data: { vacio: " " }});
  }

  static create_post(req, res) {
    // console.log(req.body)
    Personal.create(req.body, function (error, newPersonal)  {
        if(error){
            //console.log(error)
            res.render('personals/new',{errors:errors.msg})
        }else{             
            res.redirect('/personal')
        }
    })    
  }

  static update_get(req, res, next) {
    try {
    Personal.findById(req.params.id, async function (err, personal) {
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
        var carrec_list = await Carrec.find()
        res.render("personals/update", { personal: personal, carrec_list:carrec_list});
    });
    } catch (error){
    console.log("Error");
  }}  

  static async update_post(req, res, next) {
    var carrec_list = await Carrec.find()
      var personal = new Personal({
        nom: req.body.nom,
        cognoms: req.body.cognoms,
        familia: req.body.familia,
        contrasenya: req.body.contrasenya,
        gmail: req.body.gmail,
        carrecs: req.body.carrecs,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      Personal.findByIdAndUpdate(
        req.params.id,
        personal,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, personalFound) {
          if (err) {
            //return next(err);
            res.render("personals/update", { personal: personal, error: err.message , carrec_list: carrec_list});

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("personals/update", { personal: personal, message: 'Personal Updated', carrec_list: carrec_list});
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
