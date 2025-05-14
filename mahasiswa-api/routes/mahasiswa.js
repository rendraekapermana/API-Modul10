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
    res.status(500).json({ message: "Terjadi kesalahan" });
  }
});

// Ambil semua mahasiswa
router.get('/all', async (req, res) => {
  try {
    const allMahasiswa = await Mahasiswa.find();
    res.json(allMahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ambil mahasiswa berdasarkan ID
router.get('/:id', async (req, res) => {
  try {
    const mahasiswa = await Mahasiswa.findById(req.params.id);
    if (!mahasiswa) return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    res.json(mahasiswa);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST tambah Mahasiswa
router.post("/", async (req, res) => {
  const newMhs = new Mahasiswa(req.body);
  try {
    const saved = await newMhs.save();
    res.status(201).json({
      status: true,
      data: [saved],
    });
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

    res.json({
      status: true,
      data: [updated],
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Endpoint untuk menghapus mahasiswa berdasarkan NRP
router.delete("/", async (req, res) => {
  const { nrp } = req.query; // Ambil NRP dari query parameter
  if (!nrp) {
    return res.status(400).json({ message: "NRP harus disertakan" });
  }

  try {
    const mhs = await Mahasiswa.findOneAndDelete({ nrp: nrp });
    if (!mhs) {
      return res
        .status(404)
        .json({ message: "Mahasiswa dengan NRP tersebut tidak ditemukan" });
    }
    res.status(200).json({ message: "Mahasiswa berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint untuk menghapus mahasiswa berdasarkan ID
router.delete("/:id", async (req, res) => {
  try {
    const mhs = await Mahasiswa.findByIdAndDelete(req.params.id);
    if (!mhs) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }
    res.status(200).json({ message: "Mahasiswa berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
