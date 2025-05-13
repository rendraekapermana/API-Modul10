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
mongoose
  .connect("mongodb+srv://<your-mongo-uri>", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
