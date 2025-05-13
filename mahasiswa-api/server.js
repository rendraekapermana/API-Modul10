const express = require("express");
const app = express();
const port = 3000;

// Middleware untuk meng-handle body request dalam format application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.post("/mahasiswa", (req, res) => {
  const { nrp, nama, email, jurusan } = req.body;

  // Periksa jika ada data yang tidak ada
  if (!nrp || !nama || !email || !jurusan) {
    return res.status(400).json({ message: "Semua field harus diisi!" });
  }

  // Simulasi penyimpanan data (misalnya, simpan ke database)
  res.status(200).json({
    message: "Mahasiswa berhasil ditambahkan!",
    status: true,
  });
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
