// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PersonalSchema = new Schema({
  Nom: { type: String, required: true},
  Cognoms: { type: String, required: true},
  Gmail: { type: String, required: true},
  Carrec: { type: String, required: true}
  });


// Export model.
module.exports = mongoose.model("Personal", PersonalSchema);
