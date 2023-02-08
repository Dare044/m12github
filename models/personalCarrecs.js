const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const personalCarrecSchema = new Schema({
  personalId: { type: Schema.Types.ObjectId, ref: "Personal" },
  carrecId: { type: Schema.Types.ObjectId, ref: "Carrec" }
});

const personalCarrec = mongoose.model("PersonalCarrec", personalCarrecSchema);


// Asignar un personal a un carrec
PersonalCarrec.create({ personalId: personal._id, projectId: project._id }, function(err, personalCarrec) {
  if (err) {
    // manejar el error
  }
  // actualizar la referencia en los esquemas de usuarios y proyectos
  Personal.findByIdAndUpdate(personal._id, { $push: { projects: personalCarrec._id } }, { new: true }, function(err, personal) {
    if (err) {
      // manejar el error
    }
  });
  Carrec.findByIdAndUpdate(carrec._id, { $push: { personal: personalCarrec._id } }, { new: true }, function(err, carrec) {
    if (err) {
      // manejar el error
    }
  });
});

module.exports = mongoose.model("PersonalCarrec", personalCarrec);