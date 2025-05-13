const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const mahasiswaRouter = require("./routes/mahasiswa"); // <- arahkan sesuai nama file

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <--- ini wajib ditambahkan

// Routing
app.use("/mahasiswa", mahasiswaRouter);

// Cek koneksi database dan run server
const mongoURI =
  "mongodb+srv://rendraeka:rendra123456789@cluster0.cxb7x.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Ganti dengan URI yang benar

mongoose
  .connect(mongoURI)
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
