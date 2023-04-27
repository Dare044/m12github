var RecepcioComanda = require("../models/recepcioComanda");
var Personal = require("../models/personal");

class RecepcioComandaController {

  // Version 1
 
  static async list(req, res, next) {
    try {
      const pageSize = 5;
      const page = parseInt(req.query.page) || 1;
      const skip = (page - 1) * pageSize;

      var list_RecepcioComandes = await RecepcioComanda.find().skip(skip).limit(pageSize);
      var totalRecepcioComandes = await RecepcioComanda.countDocuments();

      res.render('recepcioComandes/list', {
        list: list_RecepcioComandes,
        page: page,
        totalPages: Math.ceil(totalRecepcioComandes / pageSize)
      });
    }
    catch (e) {
      res.send('Error!');
    }
  }

  static async create_get(req, res, next) {
    try {
      var list_Personal = await Personal.find();
      res.render('recepcioComandes/new',{personal_list:list_Personal});   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static create_post(req, res) {
    // console.log(req.body)
    RecepcioComanda.create(req.body, function (error, newRecepcioComanda)  {
        if(error){
            //console.log(error)
            res.render('recepcioComandes/new',{error:error.message})
        }else{             
            res.redirect('/recepcioComanda')
        }
    })    
  }

  static async delete_get(req, res, next) {
    res.render('recepcioComandes/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
   
   RecepcioComanda.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/recepcioComanda')
     }else{
       res.redirect('/recepcioComanda')
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

module.exports = RecepcioComandaController;
