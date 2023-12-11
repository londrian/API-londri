const { laundry, layanan } = require("../../models");

const allLayanan = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares

    const cekAdmin = await laundry.findUnique({
      where: {
        id: jwtAdminId,
      },
    });

    if (!cekAdmin) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses",
      });
    }

    const data = await layanan.findMany({
      where: {
        laundryId: jwtAdminId,
      },
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        namaLayanan: true,
        hargaLayanan: true,
        status: true,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Data layanan laundri berhasil ditampilkan",
      resultAllLayanan: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const detailLayanan = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const getLayananId = parseInt(req.params.layananId); // From parameter

    const cekAdmin = await laundry.findUnique({
      where: {
        id: jwtAdminId,
      },
    });

    if (!cekAdmin) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses",
      });
    }

    const data = await layanan.findFirst({
      where: {
        id: getLayananId,
        laundryId: jwtAdminId,
      },
      select: {
        id: true,
        namaLayanan: true,
        hargaLayanan: true,
        status: true,
      },
    });

    if (data == null) {
      return res.status(200).json({
        error: false,
        message: `Layanan #${getLayananId} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      error: false,
      message: `Layanan #${getLayananId} berhasil ditampilkan`,
      resultAllLayanan: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const createLayanan = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const { nama_layanan, harga_layanan } = req.body;
    const cekAdmin = await laundry.findUnique({
      where: {
        id: jwtAdminId,
      },
    });

    if (!cekAdmin) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses",
      });
    }

    const data = await layanan.create({
      data: {
        laundryId: jwtAdminId,
        namaLayanan: nama_layanan,
        hargaLayanan: parseFloat(harga_layanan),
        status: "Tidak Tersedia",
      },
    });

    return res.status(201).json({
      error: false,
      message: "Layanan laundri berhasil dibuat",
      resultLayanan: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const editLayanan = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const getLayananId = parseInt(req.params.layananId); // From parameter
    const { nama_layanan, harga_layanan, status } = req.body;
    const cekAdmin = await laundry.findUnique({
      where: {
        id: jwtAdminId,
      },
    });

    const cekLayanan = await layanan.findUnique({
      where: {
        id: getLayananId,
        laundryId: jwtAdminId,
      },
    });

    if (!cekAdmin) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses",
      });
    }

    if (!cekLayanan) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses merubah layanan ini",
      });
    }

    const data = await layanan.update({
      where: {
        id: getLayananId,
      },
      data: {
        namaLayanan: nama_layanan,
        hargaLayanan: parseFloat(harga_layanan),
        status: status,
      },
    });

    return res.status(201).json({
      error: false,
      message: "Layanan laundri berhasil dirubah",
      resultLayanan: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const deleteLayanan = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const getLayananId = parseInt(req.params.layananId); // From parameter

    const cekAdmin = await laundry.findUnique({
      where: {
        id: jwtAdminId,
      },
    });

    if (!cekAdmin) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses",
      });
    }

    const cekLayanan = await layanan.findUnique({
      where: {
        id: getLayananId,
        laundryId: jwtAdminId,
      },
    });

    if (!cekLayanan) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses menghapus layanan ini",
      });
    }

    const data = await layanan.delete({
      where: {
        id: getLayananId,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Layanan laundri berhasil dihapus",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

module.exports = {
  allLayanan,
  detailLayanan,
  createLayanan,
  editLayanan,
  deleteLayanan,
};
