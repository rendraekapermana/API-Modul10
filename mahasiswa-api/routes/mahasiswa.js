const express = require("express");
const router = express.Router();
const Mahasiswa = require("../models/Mahasiswa");

// GET semua Mahasiswa
router.get("/", async (req, res) => {
  try {
    const data = await Mahasiswa.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    const mhs = await Mahasiswa.findById(req.params.id);
    if (!mhs)
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    res.json(mhs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST Mahasiswa
router.post("/", async (req, res) => {
  try {
    const { nama, nrp, email, jurusan } = req.body;

    const newMhs = new Mahasiswa({ nama, nrp, email, jurusan });
    const saved = await newMhs.save();

    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update Mahasiswa
router.put("/:id", async (req, res) => {
  try {
    const updated = await Mahasiswa.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated)
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
