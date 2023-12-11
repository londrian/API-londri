require("dotenv").config();

const { order, layanan, laundry } = require("../../models");
const utils = require("../../utils");

const createOrder = async (req, res) => {
  try {
    const jwtUserId = res.sessionLogin.id; // From checktoken middlewares
    const getLaundryId = parseInt(req.params.laundryId);
    const { estimasi_berat, layanan_id, catatan } = req.body;

    const cekLayanan = await layanan.findUnique({
      where: {
        id: parseInt(layanan_id),
        laundryId: getLaundryId,
      },
      select: {
        hargaLayanan: true,
        namaLayanan: true,
      },
    });

    const harga = cekLayanan.hargaLayanan;
    const hargaTotal = parseFloat(harga) * parseFloat(estimasi_berat);
    const encryptOrderTrx = await utils.encryptOrder();
    const randomNumber = Math.floor(10000 + Math.random() * 90000);

    const data = await order.create({
      data: {
        customerId: jwtUserId,
        laundryId: getLaundryId,
        layananId: parseInt(layanan_id),
        orderTrx: `TRX-${encryptOrderTrx}-${randomNumber}`,
        estimasiBerat: parseFloat(estimasi_berat),
        hargaTotal: hargaTotal,
        catatan: catatan,
        status: "Menunggu Diterima",
      },
    });

    const cekLaundry = await laundry.findFirst({
      where: {
        id: parseInt(data.laundryId),
      },
      select: {
        namaLaundry: true,
      },
    });

    const responseData = {
      ...data,
      laundryId: undefined,
      layananId: undefined,
      hargaTotal: data.hargaTotal ? parseFloat(data.hargaTotal) : null,
      namaLaundry: cekLaundry.namaLaundry,
      namaLayanan: cekLayanan.namaLayanan,
    };

    return res.status(201).json({
      error: false,
      message: "Proses order berhasil dilakukan",
      resultOrder: responseData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const allOrder = async (req, res) => {
  try {
    const jwtUserId = res.sessionLogin.id; // From checktoken middlewares

    const data = await order.findMany({
      where: {
        customerId: jwtUserId,
      },
      orderBy: {
        id: "asc",
      },
      include: {
        Laundry: {
          select: {
            namaLaundry: true,
          },
        },
        Layanan: {
          select: {
            namaLayanan: true,
          },
        },
      },
    });

    const resultData = data.map((item) => ({
      ...item,
      laundryId: undefined,
      layananId: undefined,
      Layanan: undefined,
      Laundry: undefined,
      hargaTotal: item.hargaTotal ? parseFloat(item.hargaTotal) : null,
      namaLayanan: item.Layanan.namaLayanan,
      namaLaundri: item.Laundry.namaLaundry,
    }));

    return res.status(200).json({
      error: false,
      message: "Riwayat order berhasil ditampilkan",
      resultRiwayat: resultData,
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
  createOrder,
  allOrder,
};
