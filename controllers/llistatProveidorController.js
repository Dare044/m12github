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

  /*
  static update_get(req, res, next) {
    RecepcioComanda.findById(req.params.id, function (err, recepcioComanda) {
        if (err) {
          return next(err);
        }
        if (recepcioComanda == null) {
          // No results.
          var err = new Error("RecepcioComanda not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("recepcioComandes/update", { recepcioComanda: recepcioComanda });
    });
      
  }  

  static update_post(req, res, next) {
      var recepcioComanda = new RecepcioComanda({
        estatRecepcio: req.body.estatRecepcio,
        dateRecepcio: req.body.dateRecepcio,
        llocRecepcio: req.body.llocRecepcio,
        idPersonalRecepcio: req.body.idPersonalRecepcio,
        tempsRebuda: req.params.tempsRebuda,
        valoracio: req.params.valoracio,
        observacio: req.params.observacio,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      RecepcioComanda.findByIdAndUpdate(
        req.params.id,
        recepcioComanda,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, recepcioComandaFound) {
          if (err) {
            //return next(err);
            res.render("recepcioComandes/update", { recepcioComanda: recepcioComanda, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("recepcioComandes/update", { recepcioComanda: recepcioComanda, message: 'RecepcioComanda Updated'});
        }
      );
  }

  
*/
}

module.exports = LlistatProveidorController;
