// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecepcioComandaSchema = new Schema({
  estatRecepcio:  [ "Tot de cop", "En diferents lliuraments"],
  dateRecepcio: { type: Date},
  llocRecepcio: { type: String},
  idPersonalRecepcio: { type: Schema.ObjectId, ref:"Personal" },
  tempsRebuda: { type: String},
  valoracio: { type: String, maxLength: 1},
  observacio: { type: String}
  });


// Export model.
module.exports = mongoose.model("RecepcioComanda", RecepcioComandaSchema);
