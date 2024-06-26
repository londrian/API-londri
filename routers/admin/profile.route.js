const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/profile.controller");
const checkToken = require("../../middlewares/checkToken");

router.get("/", checkToken, controller.showProfile);
router.get("/full", checkToken, controller.showFullProfile);

module.exports = router;
