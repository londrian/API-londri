require("dotenv").config();

const { laundry } = require("../../models");

const allLaundry = async (req, res) => {
  try {
    const data = await laundry.findMany({
      orderBy: { id: "asc" },
      select: {
        id: true,
        namaLaundry: true,
        fotoLaundry: true,
        nomorTelepon: true,
        alamat: true,
        latitude: true,
        longitude: true,
        status: true,
        layanan: {
          select: {
            id: true,
            namaLayanan: true,
            status: true,
            hargaLayanan: true,
          },
          orderBy: {
            id: "asc",
          },
        },
      },
    });

    return res.status(200).json({
      error: false,
      message: "Data laundri berhasil ditampilkan",
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

const detailLaundry = async (req, res) => {
  try {
    const getLaundryId = parseInt(req.params.laundryId);
    const data = await laundry.findUnique({
      where: { id: getLaundryId },
      select: {
        id: true,
        namaLaundry: true,
        fotoLaundry: true,
        nomorTelepon: true,
        alamat: true,
        latitude: true,
        longitude: true,
        status: true,
        layanan: {
          select: {
            id: true,
            namaLayanan: true,
            status: true,
            hargaLayanan: true,
          },
        },
      },
    });

    if (data == null) {
      return res.status(200).json({
        error: false,
        message: "Data laundri tidak ditemukan",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Data laundri berhasil ditampilkan",
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

const searchLaundry = async (req, res) => {
  try {
    const laundrySearchParams = req.query.laundry;
    const data = await laundry.findMany({
      where: {
        namaLaundry: {
          contains: laundrySearchParams,
          mode: "insensitive",
        },
      },
      orderBy: {
        id: "asc",
      },
      select: {
        id: true,
        namaLaundry: true,
        fotoLaundry: true,
        nomorTelepon: true,
        alamat: true,
        latitude: true,
        longitude: true,
        status: true,
        layanan: {
          select: {
            id: true,
            namaLayanan: true,
            status: true,
            hargaLayanan: true,
          },
        },
      },
    });

    if (data == null) {
      return res.status(200).json({
        error: false,
        message: "Data laundri tidak ditemukan",
      });
    }

    return res.status(200).json({
      error: false,
      message: "Data laundri berhasil ditemukan",
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
  allLaundry,
  detailLaundry,
  searchLaundry,
};
