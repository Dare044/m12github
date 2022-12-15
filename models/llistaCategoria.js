// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LlistaCategoriaSchema = new Schema({
  concepte: { type: String},
  nom: { type: String},
  descripcio: { type: String },
  numDemanats: { type: Number, default: 0},
  costTotal: {type: Number, default: 0},
  });


// Export model.
module.exports = mongoose.model("LlistaCategoria", LlistaCategoriaSchema);
