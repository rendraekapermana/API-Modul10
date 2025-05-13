const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");

// GET semua Mahasiswa
router.get("/", async (req, res) => {
  try {
    const data = await Mahasiswa.find();
    res.json(data); // Kembalikan array data mahasiswa
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET mahasiswa berdasarkan ID MongoDB
router.get("/:id", async (req, res) => {
  try {
    const mhs = await Mahasiswa.findById(req.params.id);
    if (!mhs)
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });

    // Kembalikan data dalam bentuk array (untuk konsistensi dengan kode Android)
    res.json([mhs]); // Membungkus hasil dalam array
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST tambah Mahasiswa
router.post("/", async (req, res) => {
  const newMhs = new Mahasiswa(req.body);
  try {
    const saved = await newMhs.save();
    res.status(201).json([saved]); // Mengirimkan data yang disimpan dalam array
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

    // Kembalikan data yang diperbarui dalam array
    res.json([updated]); // Membungkus hasil dalam array
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
