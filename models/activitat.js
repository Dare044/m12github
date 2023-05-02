var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ActivitatSchema = new Schema({
  nom: { type: String},
  descripcio: { type: String, maxLength: 20},
  });


// Export model.
module.exports = mongoose.model("Activitat", ActivitatSchema);
