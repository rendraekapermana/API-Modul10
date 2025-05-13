const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");

// GET semua Mahasiswa berdasarkan query NRP
router.get("/", async (req, res) => {
  try {
    const mahasiswaList = await Mahasiswa.find({ nrp: req.query.nrp });
    res.status(200).json({ mahasiswa: mahasiswaList });
  } catch (err) {
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// GET mahasiswa berdasarkan ID MongoDB
router.get("/:id", async (req, res) => {
  try {
    const mhs = await Mahasiswa.findById(req.params.id);
    if (!mhs)
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });

    res.json([mhs]); // Bungkus dalam array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah Mahasiswa
router.post("/", async (req, res) => {
  const newMhs = new Mahasiswa(req.body);
  try {
    const saved = await newMhs.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update mahasiswa
router.put("/:id", async (req, res) => {
  try {
    const updated = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });

    res.json([updated]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
