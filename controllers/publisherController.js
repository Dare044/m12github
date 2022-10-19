var Publisher = require("../models/publisher");

class PublisherController {

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
      Publisher.find()        
          .exec(function (err, publisher_list) {
            if (err) {
              return next(err);
            }
            
            res.render('publishers/list',{list:publisher_list})
        });     
    }
  

  static create_get(req, res, next) {
      res.render('publishers/new');
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
    Publisher.create(req.body, function (error, newPublisher)  {
        if(error){
            //console.log(error)
            res.render('publishers/new',{error:error.message})
        }else{             
            res.redirect('/publisher')
        }
    })    
  }
  

  static update_get(req, res, next) {
    Publisher.findById(req.params.id, function (err, publisher) {
        if (err) {
          return next(err);
        }
        if (publisher == null) {
          // No results.
          var err = new Error("Publisher not found");
          err.status = 404;
          return next(err);
        }
        // Success.
        res.render("publishers/update", { publisher: publisher });
    });
      
  }  

  static update_post(req, res, next) {
      var publisher = new Publisher({
        name: req.body.name,
        _id: req.params.id,  // Necessari per a que sobreescrigui el mateix objecte!
      });    
    
      Publisher.findByIdAndUpdate(
        req.params.id,
        publisher,
        {runValidators: true}, // comportament per defecte: buscar i modificar si el troba sense validar l'Schema
        function (err, publisherFound) {
          if (err) {
            //return next(err);
            res.render("publishers/update", { publisher: publisher, error: err.message });

          }          
          //res.redirect('/genres/update/'+ genreFound._id);
          res.render("publishers/update", { publisher: publisher, message: 'Publisher Updated'});
        }
      );
  }

  static async delete_get(req, res, next) {
     res.render('publishers/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
    
    Publisher.findByIdAndRemove(req.params.id, function (error) {
      if(error){
        res.redirect('/publisher')
      }else{
        res.redirect('/publisher')
      }
    }) 
  }

}

module.exports = PublisherController;