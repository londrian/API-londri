const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/profile.controller");
const checkToken = require("../../middlewares/checkToken");

router.get("/", checkToken, controller.showProfile);

module.exports = router;
