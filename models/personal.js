// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PersonalSchema = new Schema({
  nom: { type: String},
  cognoms: { type: String},
  gmail: { type: String},
  contrasenya: {type: String},
  familia: { type: String},
  carrec: [{ type: Schema.Types.ObjectId, ref: "PersonalCarrec" }]
  });


// Export model.
module.exports = mongoose.model("Personal", PersonalSchema);
