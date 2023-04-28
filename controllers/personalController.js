const Personal = require("../models/personal");
const Carrec = require("../models/carrec");
const bcrypt = require('bcrypt'); // Esto y lo de abajo es para la contraseña
const asyncHandler = require('express-async-handler') //
class PersonalController {



  // Version 1
  static async list(req,res,next) {
    const personals = await Personal.find().select('-cotransenya').lean()
    if (!personals) {
      return res.status(400).json({ message: 'No hi ha personal'});
    }
    res.json(personals)
    // try {
    //   var list_Personals = await Personal.find().select('-contrasenya').lean(); // Esto es para que no me devuelva la contraseña
    //   var carrec_list = await Carrec.find()
    //   res.render('personals/list',{list:list_Personals,carrec_list:carrec_list})   
    // }
    // catch(e) {
    //   res.send('Error!');
    //   // return res.status(400).json({message: 'No user found'})
    // }          
    // res.json(list_Personals)
  }

  static async create_get(req, res, next) {
    var carrec_list = await Carrec.find();
    res.render('personals/new',{carrec_list:carrec_list, errors:""});
  }
  
  static async create_post(req, res) {
    // console.log(req.body)
    const { nom, cognoms, gmail, contrasenya, familia, carrecs } = req.body;

    // Confirm data
    if (!contrasenya) {
      return res.status(400).json({message: 'Tots el camps son obligatoris'})
    }

    // Check for duplicates
    const duplicate = await Personal.findOne({gmail}).lean().exec();

    if (duplicate) {
      return res.status(409).json({ message: 'El correu electrònic ja existeix'})
    }
    const hashedPwd = await bcrypt.hash(req.body.contrasenya, 10) // "salt rounds"

    const personalObject = {nom, cognoms, gmail, "contrasenya": hashedPwd, familia, carrecs}

    const personal = await Personal.create(personalObject)

    if (personal) {
      res.status(201).json({ message: 'Usuari '+ nom +' creat'})
      // res.redirect('/personal')
    } else {
      res.status(400).json({ message: 'Invalid user data received'})
      // res.render('personals/new',{carrec_list:carrec_list})
    }

    // Personal.create(req.body, function (error, newPersonal)  {
    //   if(error){
    //       console.log(error)
    //       res.render('personals/new',{carrec_list:carrec_list})
    //   }else{             
    //       res.redirect('/personal')
    //   }
    // })    
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
        res.render("personals/update", { personal: personal, carrec_list:carrec_list, errors:""});
    });
    } catch (error){
    console.log("Error");
  }}  

  static async update_post(req, res, next) {

    // console.log(req.body)
    const { nom, cognoms, gmail, contrasenya, familia, carrecs} = req.body;
    
    // Confirm data
    if (!nom) {
      return res.status(400).json({message: 'Tots el camps son obligatoris'})
    }

    const personal = await Personal.findById(req.params.id).exec();

    if (!personal) {
      return res.status(400).json({ message: "No s'ha trobat el personal " + req.params.id  })
    }
    
    // Check for duplicates
    const duplicate = await Personal.findOne({ gmail }).lean().exec()


    personal.nom = nom
    personal.cognoms = cognoms
    personal.gmail = gmail
    personal.familia = familia
    personal.carrecs = carrecs

    if (contrasenya) {
      // Hash password
      personal.contrasenya = await bcrypt.hash(contrasenya, 10) // salt rounds
    }

    const updatedPersonal = await personal.save();

    res.json({ message: nom+' actualitzat'})

    // var carrec_list = await Carrec.find()
    //   var personal = new Personal({
    //     nom: req.body.nom,
    //     cognoms: req.body.cognoms,
    //     familia: req.body.familia,
    //     contrasenya: req.body.contrasenya,
    //     gmail: req.body.gmail,
    //     carrecs: req.body.carrecs,
    //     _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
    //   });    
    
    //   Personal.findByIdAndUpdate(
    //     req.params.id,
    //     personal,
    //     {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
    //     function (err, personalFound) {
    //       if (err) {
    //         //return next(err);
    //         res.render("personals/update", { personal: personal, error: err.message , carrec_list: carrec_list});

    //       }          
    //       //res.redirect('/genres/update/'+ genreFound._id);
    //       res.render("personals/update", { personal: personal, message: 'Personal Updated', carrec_list: carrec_list});
    //     }
    //   );
  }

  static async delete_get(req, res, next) {
    res.render('personals/delete',{id: req.params.id})
 }

 static async delete_post(req, res, next) {
   const id  = req.params.id

   if (!id) {
      return res.status(400).json({ message: 'User ID Required'})
   }

   const carrecs = await Carrec.findOne({ personal: id}).lean().exec()
   if (carrecs?.length) {
      return res.status(400).json({ message: 'User has assigned carrecs'})
   }

   const personal = await Personal.findById(id).exec()

   if (!personal) {
    return res.status(400).json({ message: 'Personal not found'})
   }

   const result = await personal.deleteOne();

   const reply = 'Personal '+result.nom+' amb la id: '+result._id+' deleted'
  
   res.redirect('/personal')
//  res.render('personals/list',{replyDelete: reply})
//   res.json(reply);
//    Personal.findByIdAndRemove(req.params.id, function (error) {
//      if(error){
//        res.redirect('/personal')
//      }else{
//        res.redirect('/personal')
//      }
//    }) 
  }

  

}

module.exports = PersonalController;
