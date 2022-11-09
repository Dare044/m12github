var LlistatProveidor = require("../models/llistatProveidor");
var Activitat = require("../models/activitat");

class LlistatProveidorController {

  // Version 1
  static async list(req,res,next) {
    try {
      var list_llistatProveidors = await LlistatProveidor.find();
      res.render('LlistatProveidors/list',{list:list_LlistatProveidors});   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static async create_get(req, res, next) {
    try {
      var list_Activitat = await Activitat.find();
      res.render('llistatProveidors/new',{activitat_list:list_Activitat});   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static create_post(req, res) {
    // console.log(req.body)
    LlistatProveidor.create(req.body, function (error, newLlistatProveidor)  {
        if(error){
            //console.log(error)
            res.render('llistatProveidors/new',{error:error.message})
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
