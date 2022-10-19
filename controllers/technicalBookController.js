var TechnicalBook = require("../models/technicalBook");
var Genre = require("../models/genre");
var Publisher = require("../models/publisher")

class TechnicalBookController {

  // Version 1
  /*
  static async list(req,res,next) {
    try {
      var list_genres = await Genre.find();
      res.render('genres/list',{list:list_genres})   
    }
    catch(e) {
      res.send('Error!');
    }          
  }
*/
  
  // Version 2
  
    static list(req,res,next) {
      TechnicalBook.find()
        .exec(function (err, technicalBook_list) {
            if (err) {
              return next(err);
            }
            
            res.render('technicalBooks/list',{list:technicalBook_list})
        });          
    }

      static async create_get(req, res, next) {
      var publisher_list = await Publisher.find();
      var genre_list = await Genre.find();
      res.render('technicalBooks/new',{genre_list:genre_list,publisher_list:publisher_list}); 
      
  }

  // version 1
  /*
  static async create_post(req, res) {
   
    try {
      var genre = new Genre({ name: req.body.name });
      await genre.save();
      res.redirect('/genres') 
    }
    catch(error) {
      res.send(error.message);
    }
    
  }
  */

  // version 2
  /*
  static async create_post(req, res) {
   
    try {
      var newGender = await Genre.create({ name: req.body.name });
      console.log(newGender)
      res.redirect('/genres') 
    }
    catch(error) {
       res.render('genres/new',{error: error.message})
    }
    
  }
  */

  // version 3: sense async/await
  
  static create_post(req, res) {
    // console.log(req.body)
    TechnicalBook.create(req.body, function (error, newTechnicalBook)  {
        if(error){
            //console.log(error)
            res.render('technicalBooks/new',{error:error.message})
        }else{             
            res.redirect('/technicalBook')
        }
    })    
  }



}

module.exports = TechnicalBookController;