var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PropostaNecessitatSchema = new Schema({
  idPersonal: { type: Schema.ObjectId, ref:"Personal" },
  idFullComanda: { type: Schema.ObjectId, ref:"FullComanda" },
  costTotal: { type: Number },
  estat: { type: String, enum: ["EnProces", "Aprovada"]}
  });


// Export model.
module.exports = mongoose.model("PropostaNecessitat", PropostaNecessitatSchema);
