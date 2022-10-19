// Model serveix per accedir a la base de dades

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var TechnicalBookSchema = new Schema({
  title: { type: String, required: true},
  publisher: { type: Schema.ObjectId, ref:"Publisher" },
  author: { type: 
          [
            {
              firstname: String,
              lastname: String,
            }
          ]
          },
  summary: { type: String, required: true },
  isbn: { type: String, required: true },
  genre: [{type: Schema.ObjectId, ref: "Genre"}], // Com és un array es pot guardar més d'un genere
});


// Export model.
module.exports = mongoose.model("TechnicalBook", TechnicalBookSchema);
