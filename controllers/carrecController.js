const Carrec = require("../models/carrec");

exports.getAllCarrecs = async (req, res) => {
  try {
    const carrecs = await Carrec.find();
    res.status(200).json(carrecs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
