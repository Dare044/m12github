var LlistatProveidor = require("../models/llistatProveidor");
var Activitat = require("../models/activitat");

class LlistatProveidorController {

  // Version 1
  static async list(req,res,next) {
    try {
      const page = parseInt(req.query.page) || 1; // Obtiene el número de página de la URL, por defecto 1
      const pageSize = 5; // Tamaño de página (cantidad de elementos por página)
      const skip = (page - 1) * pageSize;
  
      var list_llistatProveidors = await LlistatProveidor.find().skip(skip).limit(pageSize).exec();
      const totalCount = await LlistatProveidor.countDocuments(); // Obtiene la cantidad total de elementos para calcular la cantidad de páginas
      var list_Activitat = await Activitat.find();
      res.render('llistatProveidors/list', { list: list_llistatProveidors, activitat_list: list_Activitat, page, totalPages: Math.ceil(totalCount / pageSize) });
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static async create_get(req, res, next) {
    try {
      var activitat_list = await Activitat.find();
      res.render('llistatProveidors/new',{activitat_list:activitat_list, errors:""});   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static create_post(req, res) {
    // console.log(req.body)
    LlistatProveidor.create(req.body, async function (error, newLlistatProveidor)  {
      if(error){
          console.log(error)
          var activitat_list = await Activitat.find();
          res.render('llistatProveidors/new',{activitat_list:activitat_list})
      }else{             
          res.redirect('/llistatProveidor')
      }
  })    
  }

  static async delete_get(req, res, next) {
    res.render('llistatProveidors/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
   
   LlistatProveidor.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/llistatProveidor')
     }else{
       res.redirect('/llistatProveidor')
     }
   }) 
  }

  static update_get(req, res, next) {
    LlistatProveidor.findById(req.params.id, function (err, llistatProveidor) {
        if (err) {
          return next(err);
        }
        if (llistatProveidor == null) {
          // No results.
          var err = new Error("Proveïdor not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("llistatProveidors/update", { data: llistatProveidor , errors:""});
    });
  }  

  static update_post(req, res, next) {
    LlistatProveidor.findById(req.params.id, function (err, llistatProveidorFound) {
      if (err) {
        return next(err);
      }
    
      llistatProveidorFound.numDeficiencies = req.body.numDeficiencies;
      llistatProveidorFound.numIncorreccions = req.body.numIncorreccions;
    
      llistatProveidorFound.save(function (err) {
        if (err) {
          return next(err);
        }
    
        res.redirect("/llistatProveidor");
      });
    });
  }
}

module.exports = LlistatProveidorController;
