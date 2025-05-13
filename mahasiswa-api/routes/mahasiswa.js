// routes/mahasiswa.js
const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");

// GET semua Mahasiswa berdasarkan query NRP
router.get("/", async (req, res) => {
  try {
    const mahasiswaList = await Mahasiswa.find({ nrp: req.query.nrp });
    res.status(200).json({
      status: true,
      data: mahasiswaList,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Terjadi kesalahan",
    });
  }
});

// POST tambah Mahasiswa
router.post("/", async (req, res) => {
  const newMhs = new Mahasiswa(req.body);
  try {
    await newMhs.save();
    res.status(201).json({
      status: true,
      message: "Berhasil menambahkan",
    });
  } catch (err) {
    res.status(400).json({
      status: false,
      message: "Gagal menambahkan: " + err.message,
    });
  }
});

module.exports = router;
