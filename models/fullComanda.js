var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var FullComandaSchema = new Schema({
  dataGeneracio: { type: String},
  idProveidor: { type: Schema.ObjectId, ref:"llistatProveidor" },
});


// Export model.
module.exports = mongoose.model("FullComanda", FullComandaSchema);
