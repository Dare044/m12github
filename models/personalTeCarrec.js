// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PersonalTeCarrecSchema = new Schema({
    idPersonal: {type: Schema.ObjectId, ref:"Personal"},
    idCarrec: {type: Schema.ObjectId, ref:"Carrec"},
  });


// Export model.
module.exports = mongoose.model("PersonalTeCarrec", PersonalTeCarrecSchema);
