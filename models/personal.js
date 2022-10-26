// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PersonalSchema = new Schema({
  Nom: { type: String},
  Cognoms: { type: String},
  Gmail: { type: String},
  Carrec: { type: String}
  });


// Export model.
module.exports = mongoose.model("Personal", PersonalSchema);
