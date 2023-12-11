const express = require("express");
const router = express.Router();
const controller = require("../../controllers/admin/order.controller");
const checkToken = require("../../middlewares/checkToken");

router.get("/", checkToken, controller.allOrder);
router.post("/:orderTrx", checkToken, controller.terimaOrder);

module.exports = router;
