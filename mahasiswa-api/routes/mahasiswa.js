const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");

// GET /mahasiswa?nrp=...
router.get('/', async (req, res) => {
  const nrp = req.query.nrp;
  try {
    const mahasiswa = await Mahasiswa.findOne({ nrp });

    if (!mahasiswa) {
      return res.status(404).json({
        status: false,
        data: [],
        message: 'Mahasiswa tidak ditemukan'
      });
    }

    // Kembalikan dalam bentuk array
    res.json({
      status: true,
      data: [mahasiswa]
    });

  } catch (err) {
    res.status(500).json({
      status: false,
      data: [],
      message: 'Terjadi kesalahan server'
    });
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
