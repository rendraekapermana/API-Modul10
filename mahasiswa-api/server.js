const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const mahasiswaRouter = require("./routes/mahasiswa");

const app = express();

// Middleware penting!
app.use(cors());
app.use(express.json()); // untuk JSON
app.use(express.urlencoded({ extended: true })); // UNTUK application/x-www-form-urlencoded

// Routing
app.use("/mahasiswa", mahasiswaRouter);

// Port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
