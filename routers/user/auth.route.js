const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/auth.controller");
const multerLib = require("multer")();

router.post("/register", multerLib.single("photo"), controller.register);
router.post("/login", controller.login);

module.exports = router;
