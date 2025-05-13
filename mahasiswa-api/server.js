const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Mahasiswa = require("./models/Mahasiswa");

// Middleware penting!
app.use(express.json()); // Untuk JSON
app.use(express.urlencoded({ extended: true })); // Untuk x-www-form-urlencoded

app.post("/mahasiswa", (req, res) => {
  const mahasiswaData = req.body;

  if (Array.isArray(mahasiswaData)) {
    return res
      .status(400)
      .json({ message: "Data harus berupa objek, bukan array" });
  }

  const mahasiswaBaru = new Mahasiswa(mahasiswaData);

  mahasiswaBaru
    .save()
    .then((result) => {
      res.status(201).json(result); // ✅ Kirimkan langsung objek Mahasiswa
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Gagal menyimpan data mahasiswa", error: err });
    });
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
  const { nrp } = req.query;

  try {
    const data = await Mahasiswa.findOne({ nrp });

    if (!data) {
      return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
    }

    res.json(data); // ✅ Mengembalikan objek
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});




// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
