// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PropostaPressupostSchema = new Schema({
  idPersonal: { type: Schema.ObjectId, ref:"Personal" },
  idFullComanda: { type: Schema.ObjectId, ref:"FullComanda" },
  prioritat: { type: Number, default: 1},  
  costTotal: { type: Number, required: true},
  estat: { type: String, enum: ["EnProces", "Aprovada"]}
  });


// Export model.
module.exports = mongoose.model("PropostaPressupost", PropostaPressupostSchema);
