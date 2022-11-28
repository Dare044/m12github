var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FullComandaSchema = new Schema({
  dataGeneracio: { type: String},
  idProveidor: { type: Schema.ObjectId, ref:"llistatProveidor" },
  costFinal: { type: Number},
  
});


// Export model.
module.exports = mongoose.model("FullComanda", FullComandaSchema);
