var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var RecepcioComandaSchema = new Schema({
  estatRecepcio:  [ "TotDeCop", "EnDiferentsLliuraments"],
  dateRecepcio: { type: Date},
  llocRecepcio: { type: String},
  idPersonalRecepcio: { type: Schema.ObjectId, ref:"Personal" },
  tempsRebuda: { type: String},
  valoracio: { type: String, maxLength: 1},
  observacio: { type: String}
  });


// Export model.
module.exports = mongoose.model("RecepcioComanda", RecepcioComandaSchema);
