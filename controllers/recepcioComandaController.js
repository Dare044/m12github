var RecepcioComanda = require("../models/recepcioComanda");
var Personal = require("../models/personal");
var PropostaPressupost = require("../models/propostaPressupost");
var PropostaNecessitat = require("../models/propostaNecessitat");
var Element = require("../models/element");

class RecepcioComandaController {

  // Version 1
  static async list(req,res,next) {
    try {
      const page = parseInt(req.query.page) || 1;
      const pageSize = 5;
      const skip = (page - 1) * pageSize;
      
      var list_RecepcioComandes = await RecepcioComanda.find().skip(skip).limit(pageSize).exec();
      const totalCount = await RecepcioComanda.countDocuments(); // Obtiene la cantidad total de elementos para calcular la cantidad de páginas
      res.render('recepcioComandes/list',{list:list_RecepcioComandes, page, totalPages: Math.ceil(totalCount / pageSize) });   
    }
    catch(e) {
      res.send('Error!');
    }          
  }

  static async create_get(req, res, next) {
    try {
      var personal_list = await Personal.find();
      var PropostaPressupost_list = await PropostaPressupost.find();
      var PropostaNecessitat_list = await PropostaNecessitat.find();
      var Element_list = await Element.find();

      // Combinar las listas de propuestas
      var Proposta_list = PropostaPressupost_list.concat(PropostaNecessitat_list);

      // Crear el array que contendrá las propuestas y sus elementos relacionados
      var PropostaElement_list = Proposta_list.map(proposta => {
        // Filtrar los elementos relacionados a la propuesta actual
        var elements = Element_list.filter(element => {
          return element.idPropostaPressupost == proposta.id || element.idPropostaNecessitat == proposta.id;
        });
        // Crear un objeto que contenga la propuesta y sus elementos relacionados
        return { proposta: proposta, elements: elements };
      });

      // El resultado estará en el array PropostaElement_list
      console.log(PropostaElement_list);

      var PropostaElement_list_con_elementos = PropostaElement_list.filter(item => item.elements.length > 0);

      // Crear un nuevo array con la información deseada
      var result = PropostaElement_list_con_elementos.map(item => {
        // Obtener la id de la propuesta
        var propostaId = item.proposta._id.toString();
        // Obtener el array de elementos y extraer los nombres
        var elementsNoms = item.elements.map(element => element.nom);
        // Combinar la id de la propuesta y los nombres de los elementos en un nuevo array
        return [propostaId].concat(elementsNoms);
      });

      
      // El resultado estará en el array result
      console.log(result);

      res.render('recepcioComandes/new',{personal_list:personal_list, errors:"", propuestas_list:result});   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static create_post(req, res) {
    // console.log(req.body)
    var newRecepcioComanda = new RecepcioComanda({
      estatRecepcio: req.body.estatRecepcio,
      dateRecepcio: req.body.dateRecepcio,
      llocRecepcio: req.body.llocRecepcio,
      idPersonalRecepcio: req.body.idPersonalRecepcio,
      tempsRebuda: req.body.tempsRebuda,
      valoracio: req.body.valoracio,
      observacio: req.body.observacio
    });
    
    newRecepcioComanda.save(function(error) {
      if (error) {
        //console.log(error)
        res.render('recepcioComandes/new', { error: error.message });
      } else {
        console.log(req.body.idProposta);           
        res.redirect('/recepcioComanda');
      }
    });
      
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
