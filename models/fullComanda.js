var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FullComandaSchema = new Schema({
  dataGeneracio: { type: Date},
  costFinal: { type: Number}
});


// Export model.
module.exports = mongoose.model("FullComanda", FullComandaSchema);
