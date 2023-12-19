const { layanan } = require("../../models");

const layananByLaundryId = async (req, res) => {
  try {
    const getLaundryId = parseInt(req.params.laundryId);
    const data = await layanan.findMany({
      where: { laundryId: getLaundryId },
      select: {
        id: true,
        namaLayanan: true,
        status: true,
        hargaLayanan: true,
      },
    });

    if (data == null) {
      return res.status(200).json({
        error: false,
        message: `Layanan laundri #${getLaundryId} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      error: false,
      message: `Layanan laundri #${getLaundryId} berhasil ditampilkan`,
      resultData: data,
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
  layananByLaundryId,
};
