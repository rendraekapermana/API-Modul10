const mongoose = require("mongoose");

const MahasiswaSchema = new mongoose.Schema({
  nama: String,
  email: String,
  jurusan: String,
  id: String,
  nrp: String,
});

module.exports = mongoose.model("Mahasiswa", MahasiswaSchema);
