var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ElementSchema = new Schema({
    idConcepte: { type: Schema.ObjectId, ref:"LlistaCategoria" },
    idProveidor: { type: Schema.ObjectId, ref:"llistatProveidor" },
    idPropostaPressupost: { type: Schema.ObjectId, ref:"PropostaPressupost" },
    idPropostaNecessitat: { type: Schema.ObjectId, ref:"PropostaNecessitat" },
    nom: { type: String},
    quantitat: { type: Number},
    descripció: { type: String},
    objectiu: { type: String},
    valor: { type: Number}
  
});


// Export model.
module.exports = mongoose.model("Element", ElementSchema);
