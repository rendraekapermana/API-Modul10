const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mahasiswa = require("./models/Mahasiswa");

// Middleware penting!
app.use(express.json()); // Untuk JSON
app.use(express.urlencoded({ extended: true })); // Untuk x-www-form-urlencoded

app.post("/mahasiswa", async (req, res) => {
  try {
    const { nama, nrp, email, jurusan } = req.body;
    const newMhs = new Mahasiswa({ nama, nrp, email, jurusan });
    await newMhs.save();
    res.status(201).json(newMhs);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
