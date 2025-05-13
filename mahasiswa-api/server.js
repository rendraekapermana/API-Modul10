const express = require("express");
const mongoose = require("mongoose");
const mahasiswaRoutes = require("./routes/mahasiswa");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/mahasiswa",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(cors());
app.use(express.json()); // <- WAJIB AGAR BODY JSON DIBACA
app.use("/mahasiswa", mahasiswaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
