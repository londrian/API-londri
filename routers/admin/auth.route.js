const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/auth.controller");
const multerLib = require("multer")();

router.post("/register", multerLib.single("foto_laundry"), controller.register);
router.post("/login", controller.login);

module.exports = router;
