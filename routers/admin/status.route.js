const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/status.controller");
const checkToken = require("../../middlewares/checkToken");

router.post("/laundry", checkToken, controller.changeStatusLaundry);
router.put("/laundry", checkToken, controller.changeStatusLaundry);
router.post("/layanan/:layananId", checkToken, controller.changeStatusLayanan);
router.put("/layanan/:layananId", checkToken, controller.changeStatusLayanan);

module.exports = router;
