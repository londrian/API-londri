require("dotenv").config();

const { laundry } = require("../../models");
const utils = require("../../utils");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_KEY || "no_secret";

const showProfile = async (req, res) => {
  try {
    const jwtAdminId = res.sessionLogin.id; // From checktoken middlewares
    const data = await laundry.findUnique({
      where: {
        id: jwtAdminId,
      },
    });

    delete data["password"];

    return res.status(200).json({
      error: false,
      message: "Load profile berhasil",
      response: data,
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
  showProfile,
};
