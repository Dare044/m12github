var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CarrecSchema = new Schema({
  nom: { type: String},
  personals: [{ type: Schema.ObjectId, ref: "Personal" }]
  });


// Export model.
module.exports = mongoose.model("Carrec", CarrecSchema);
