const mongoose = require("mongoose");

const mahasiswaSchema = new mongoose.Schema({
  nama: { type: String, required: true },
  jurusan: { type: String, required: true },
  nrp: { type: String, required: true },
  email: { type: String, required: true },
});

module.exports = mongoose.model("Mahasiswa", mahasiswaSchema);
