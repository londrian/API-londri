const { customer, order, layanan, laundry } = require("../../models");

const allOrder = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares

    const data = await order.findMany({
      where: {
        laundryId: jwtAdminId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        orderTrx: true,
        hargaTotal: true,
        estimasiBerat: true,
        catatan: true,
        status: true,
        createdAt: true,
        Layanan: {
          select: {
            id: true,
            namaLayanan: true,
            hargaLayanan: true,
          },
        },
        Customer: {
          select: {
            id: true,
            namaLengkap: true,
            alamat: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    const resultData = data.map((item) => ({
      Layanan: undefined,
      Customer: undefined,
      createdAt: undefined,
      id: item.id,
      orderTrx: item.orderTrx,
      namaCustomer: item.Customer.namaLengkap,
      alamatCustomer: item.Customer.alamat,
      latitude: item.Customer.latitude,
      longitude: item.Customer.longitude,
      layanan: item.Layanan.namaLayanan,
      hargaLayanan: item.Layanan.hargaLayanan,
      estimasiBerat: item.estimasiBerat,
      hargaTotal: item.hargaTotal ? parseFloat(item.hargaTotal) : null,
      catatan: item.catatan,
      status: item.status,
      tanggalOrder: item.createdAt,
    }));

    return res.status(200).json({
      error: false,
      message: "Data order berhasil ditampilkan",
      resultOrder: resultData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: false,
      message: error || "Internal server error",
    });
  }
};

const terimaOrder = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const orderTrx = req.params.orderTrx;
    const { status } = req.body;

    const cekOrder = await order.findFirst({
      where: {
        laundryId: jwtAdminId,
        orderTrx: orderTrx,
      },
    });

    if (!cekOrder) {
      return res.status(200).json({
        error: true,
        message: "Akses tidak diperbolehkan",
      });
    }

    const data = await order.update({
      where: {
        id: cekOrder.id,
        orderTrx: orderTrx,
      },
      data: {
        status: status,
      },
    });

    const cekUser = await customer.findFirst({
      where: {
        id: data.customerId,
      },
      select: {
        namaLengkap: true,
        alamat: true,
        latitude: true,
        longitude: true,
      },
    });

    const cekLayanan = await layanan.findFirst({
      where: {
        id: data.layananId,
      },
      select: {
        namaLayanan: true,
      },
    });

    const cekLaundry = await laundry.findFirst({
      where: {
        id: data.laundryId,
      },
      select: {
        namaLaundry: true,
      },
    });

    const resultData = {
      ...data,
      layananId: undefined,
      laundryId: undefined,
      hargaTotal: data.hargaTotal ? parseFloat(data.hargaTotal) : null,
      namaCustomer: cekUser.namaLengkap,
      alamatCustomer: cekUser.alamat,
      latitude: cekUser.latitude,
      longitude: cekUser.longitude,
      namaLayanan: cekLayanan.namaLayanan,
      namaLaundry: cekLaundry.namaLaundry,
    };

    return res.status(201).json({
      error: false,
      message: "Status order berhasil diperbarui",
      resultProses: resultData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: false,
      message: error || "Internal server error",
    });
  }
};

const detailOrder = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const orderTrx = req.params.orderTrx;

    const data = await order.findFirst({
      where: {
        orderTrx: orderTrx,
        laundryId: jwtAdminId,
      },
      select: {
        id: true,
        orderTrx: true,
        hargaTotal: true,
        estimasiBerat: true,
        catatan: true,
        status: true,
        createdAt: true,
        Layanan: {
          select: {
            id: true,
            namaLayanan: true,
            hargaLayanan: true,
          },
        },
        Customer: {
          select: {
            id: true,
            namaLengkap: true,
            alamat: true,
            latitude: true,
            longitude: true,
          },
        },
      },
    });

    if (!data) {
      return res.status(404).json({
        error: true,
        message: `Data order #${orderTrx} tidak ditemukan`,
      });
    }

    const resultData = {
      Layanan: undefined,
      Customer: undefined,
      createdAt: undefined,
      id: data.id,
      orderTrx: data.orderTrx,
      namaCustomer: data.Customer.namaLengkap,
      alamatCustomer: data.Customer.alamat,
      latitude: data.Customer.latitude,
      longitude: data.Customer.longitude,
      layanan: data.Layanan.namaLayanan,
      hargaLayanan: data.Layanan.hargaLayanan,
      estimasiBerat: data.estimasiBerat,
      hargaTotal: data.hargaTotal ? parseFloat(data.hargaTotal) : null,
      catatan: data.catatan,
      status: data.status,
      tanggalOrder: data.createdAt,
    };

    return res.status(200).json({
      error: false,
      message: `Data order #${orderTrx} berhasil ditampilkan`,
      resultOrder: resultData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: false,
      message: error || "Internal server error",
    });
  }
};

module.exports = {
  allOrder,
  terimaOrder,
  detailOrder,
};
