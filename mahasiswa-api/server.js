const express = require("express");
const mongoose = require("mongoose");
const mahasiswaRoutes = require("./routes/mahasiswaRoutes"); // Mengimpor rute mahasiswa

const app = express();

// Middleware penting!
app.use(express.json()); // Untuk JSON
app.use(express.urlencoded({ extended: true })); // Untuk x-www-form-urlencoded

// Menggunakan route mahasiswa
app.use("/mahasiswa", mahasiswaRoutes); // Semua route mahasiswa di sini

// Koneksi MongoDB dan menjalankan server
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
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
