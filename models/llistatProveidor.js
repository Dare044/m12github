// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LlistatProveidorSchema = new Schema({
  Cif: { type: Number},
  nom: { type: String},
  idActivitat: [{type: Schema.ObjectId, ref:"Activitat"}],
  ubicacio: { type: String},
  contacte: { type: String},
  email: { type: String},
  numDeficiencies: { type: Number},
  numIncorreccions: { type: Number},
  });


// Export model.
module.exports = mongoose.model("llistatProveidor", LlistatProveidorSchema );
