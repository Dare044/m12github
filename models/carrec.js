// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");
const personal = require("./personal");

var Schema = mongoose.Schema;

var CarrecSchema = new Schema({
  nom: { type: String},
  personal: [{ type: Schema.Types.ObjectId, ref: "PersonalCarrec" }]
  });


// Export model.
module.exports = mongoose.model("Carrec", CarrecSchema);
