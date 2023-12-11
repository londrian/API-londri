const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/layanan.controller");
const checkToken = require("../../middlewares/checkToken");

router.get("/", checkToken, controller.allLayanan);
router.get("/detail/:layananId", checkToken, controller.detailLayanan);
router.post("/create", checkToken, controller.createLayanan);
router.post("/edit/:layananId", checkToken, controller.editLayanan);
router.put("/edit/:layananId", checkToken, controller.editLayanan);
router.post("/delete/:layananId", checkToken, controller.deleteLayanan);
router.delete("/delete/:layananId", checkToken, controller.deleteLayanan);

module.exports = router;
