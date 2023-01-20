// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CarrecSchema = new Schema({
  nom: { type: String}
  });


// Export model.
module.exports = mongoose.model("Carrec", CarrecSchema);
