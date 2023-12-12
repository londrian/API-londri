require("dotenv").config();

const { customer } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY || "no_secret";

const register = async (req, res) => {
  const { nama, email, password, nomor_telepon, alamat, latitude, longitude } =
    req.body;

  const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];
  try {
    const cekEmail = await customer.findUnique({
      where: {
        email: email,
      },
    });

    if (cekEmail) {
      return res.status(403).json({
        errur: true,
        message: "Email sudah terdaftar",
      });
    }

    let insertData = {
      namaLengkap: nama,
      email: email,
      password: await utils.encryptPassword(password),
      nomorTelepon: nomor_telepon,
      alamat: alamat,
      latitude: latitude,
      longitude: longitude,
      status: "Aktif",
    };

    if (req.file) {
      try {
        // Check filetype upload
        if (!allowedImageTypes.includes(req.file.mimetype)) {
          return res.status(400).json({
            error: true,
            message: "Tipe foto yang diupload tidak sesuai.",
          });
        }

        //  Image handle
        const fileTostring = req.file.buffer.toString("base64");

        const uploadFile = await utils.imageKit.upload({
          fileName: req.file.originalname,
          file: fileTostring,
        });

        insertData.fotoProfil = uploadFile.url;
      } catch (error) {
        return res.status(500).json({
          error: true,
          message: "Error upload gambar ke server",
        });
      }
    }

    const data = await customer.create({
      data: insertData,
    });

    delete data["password"];

    return res.status(201).json({
      error: false,
      message: "Registrasi berhasil dilakukan",
      // response: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      message: error || "Internal server error",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const cekLogin = await customer.findUnique({
      where: {
        email: email,
      },
    });

    if (!cekLogin) {
      return res.status(403).json({
        errur: true,
        message: "Email tidak terdaftar",
      });
    }

    if (bcrypt.compareSync(password, cekLogin.password)) {
      // Create token
      const token = jwt.sign(
        { id: cekLogin.id, email: cekLogin.email },
        secretKey,
        { expiresIn: "12h" }
      );

      return res.status(200).json({
        error: false,
        message: "Login berhasil",
        response: {
          token,
        },
      });
    }

    return res.status(401).json({
      error: true,
      message: "Password tidak sesuai",
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
  register,
  login,
};
