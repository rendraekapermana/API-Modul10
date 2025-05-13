const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mahasiswa = require("./models/Mahasiswa");

// Middleware penting!
app.use(express.json()); // Untuk JSON
app.use(express.urlencoded({ extended: true })); // Untuk x-www-form-urlencoded

// Endpoint untuk menambahkan Mahasiswa
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

mongoose
  .connect(
    "mongodb+srv://rendraeka:rendra123456789@cluster0.cxb7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  // Endpoint untuk mengambil data Mahasiswa
  app.get("/mahasiswa", async (req, res) => {
    try {
      const { nrp } = req.query;

      if (nrp) {
        // Cari berdasarkan NRP
        const mahasiswa = await Mahasiswa.findOne({ nrp });
        if (!mahasiswa) {
          return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
        }
        return res.json(mahasiswa);
      }

      // Jika tidak ada query, kembalikan semua
      const allMahasiswa = await Mahasiswa.find();
      res.json(allMahasiswa);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });


// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
