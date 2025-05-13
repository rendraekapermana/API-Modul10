const mongoose = require("mongoose");

const mahasiswaSchema = new mongoose.Schema({
  nrp: {
    type: String,
    required: true,
  },
  nama: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  jurusan: {
    type: String,
    required: true,
  },
});

const Mahasiswa = mongoose.model("Mahasiswa", mahasiswaSchema);

module.exports = Mahasiswa;
