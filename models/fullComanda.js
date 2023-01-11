var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FullComandaSchema = new Schema({
  dataGeneracio: { type: String},
  costFinal: { type: Number},
  
});


// Export model.
module.exports = mongoose.model("FullComanda", FullComandaSchema);
