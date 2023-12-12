const { laundry, layanan } = require("../../models");

const changeStatusLaundry = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const { status } = req.body;

    const cekLaundry = await laundry.findFirst({
      where: {
        id: jwtAdminId,
      },
    });

    if (!cekLaundry) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses merubah ini",
      });
    }

    const data = await laundry.update({
      where: {
        id: jwtAdminId,
      },
      data: {
        status: status,
      },
      select: {
        id: true,
        namaLaundry: true,
        status: true,
      },
    });

    return res.status(200).json({
      error: false,
      message: "Status laundry berhasil dirubah",
      resultStatus: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const changeStatusLayanan = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const layananId = parseInt(req.params.layananId); // From params
    const { status } = req.body;

    const cekAksesLayanan = await layanan.findFirst({
      where: {
        id: layananId,
        laundryId: jwtAdminId,
      },
    });

    if (!cekAksesLayanan) {
      return res.status(403).json({
        error: true,
        message: "Anda tidak memiliki akses merubah ini",
      });
    }

    const data = await layanan.update({
      where: {
        id: layananId,
        laundryId: jwtAdminId,
      },
      data: {
        status: status,
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
      message: "Status layanan berhasil dirubah",
      resultStatus: data,
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
  changeStatusLaundry,
  changeStatusLayanan,
};
