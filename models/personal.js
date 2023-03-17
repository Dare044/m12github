// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PersonalSchema = new Schema({
  nom: { type: String, required: true},
  cognoms: { type: String},
  gmail: { type: String},
  contrasenya: {type: String},
  familia: { type: String},
  carrecs: [{ type: Schema.Types.ObjectId, ref: 'Carrec', default: '63ec8d75de8c903cec362f46'}]
  });


// Export model.
module.exports = mongoose.model("Personal", PersonalSchema);
