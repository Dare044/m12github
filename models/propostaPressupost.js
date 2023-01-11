// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PropostaPressupostSchema = new Schema({
  idConcepte:  { type: Schema.ObjectId, ref:"LlistaCategoria" },
  idFullComanda: { type: Schema.ObjectId, ref:"FullComanda" },
  idProveidor: { type: Schema.ObjectId, ref:"llistatProveidor" },
  descripcio: { type: String },
  objectiu: { type: String },
  quantitat: { type: Number},
  valor: { type: Number},
  prioritat: { type: Number},
  estat: [ "EnProces", "Aprovada"]
  });


// Export model.
module.exports = mongoose.model("PropostaPressupost", PropostaPressupostSchema);
