var PropostaNecessitat = require("../models/propostaNecessitat");


class PropostaNecessitatController {

    static async list(req,res,next) {
        try {
          var list_propostesNecessitat = await PropostaNecessitat.find();
          res.render('propostesNecessitat/list',{list:list_propostesNecessitat})   
        }
        catch(e) {
          res.send('Error!');
        }          
      }

  static async create_get(req, res, next) {
    try {
      res.render('propostesNecessitat/new');   
    }
    catch(e) {
      res.send('Error!');
    }
  }

  static create_post(req, res) {
    // console.log(req.body)
    PropostaNecessitat.create(req.body, function (error, newPropostaNecessitat)  {
        if(error){
            //console.log(error)
            res.render('propostesNecessitat/new',{error:error.message})
        }else{             
            res.redirect('/propostaNecessitat')
        }
    })    
  }

  static async delete_get(req, res, next) {
    res.render('propostesNecessitat/delete',{id: req.params.id})
  }

  static async delete_post(req, res, next) {
   
   PropostaNecessitat.findByIdAndRemove(req.params.id, function (error) {
     if(error){
       res.redirect('/propostaNecessitat')
     }else{
       res.redirect('/propostaNecessitat')
     }
   }) 
  }

  
}

module.exports = PropostaNecessitatController;
