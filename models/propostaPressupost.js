// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecepcioComandaSchema = new Schema({
  idConcepte:  { type: Schema.ObjectId, ref:"LlistaCategoria" },
  idFullComanda: { type: Schema.ObjectId, ref:"FullComanda" },
  descripcio: { type: String },
  objectiu: { type: String },
  valor: { type: String},
  prioritat: { type: Number}
  });


// Export model.
module.exports = mongoose.model("RecepcioComanda", RecepcioComandaSchema);
