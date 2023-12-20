require("dotenv").config();

const { laundry } = require("../../models");

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
};

const allLaundryWithNearest = async (req, res) => {
  try {
    const userLatitude = parseFloat(req.body.latitude);
    const userLongitude = parseFloat(req.body.longitude);
    const maxDistance = 15; // max distance is 15km

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
      return res.status(400).json({
        error: true,
        message: "Invalid latitude or longitude",
      });
    }

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

    const filteredData = data.filter((laundry) => {
      const laundryLatitude = parseFloat(laundry.latitude);
      const laundryLongitude = parseFloat(laundry.longitude);

      if (isNaN(laundryLatitude) || isNaN(laundryLongitude)) {
        return false;
      }

      const distance = calculateDistance(
        userLatitude,
        userLongitude,
        laundryLatitude,
        laundryLongitude
      );

      return distance <= maxDistance;
    });

    return res.status(200).json({
      error: false,
      message: "Data laundri terdekat berhasil ditampilkan",
      resultData: filteredData,
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
  allLaundryWithNearest,
};
