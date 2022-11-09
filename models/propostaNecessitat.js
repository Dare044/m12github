// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PropostaNecessitatSchema = new Schema({
  idFullComanda: { type: Schema.ObjectId, ref:"FullComanda" },
  material: { type: String},
  preu: { type: Number },
  quantitat: { type: Number }
  });


// Export model.
module.exports = mongoose.model("PropostaNecessitat", PropostaNecessitatSchema);
