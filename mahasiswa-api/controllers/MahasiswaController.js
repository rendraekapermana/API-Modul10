// /controllers/mahasiswaController.js
const addMahasiswa = async (req, res) => {
  try {
    const { nrp, nama, email, jurusan } = req.body;

    if (!nrp || !nama || !email || !jurusan) {
      return res.status(400).json({ message: "Data tidak lengkap" });
    }

    const mahasiswa = new Mahasiswa({ nrp, nama, email, jurusan });
    await mahasiswa.save();

    res.status(201).json({
      status: true,
      data: [mahasiswa],
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Terjadi kesalahan" });
  }
};

module.exports = { addMahasiswa };
