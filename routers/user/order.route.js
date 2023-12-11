const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/order.controller");
const checkToken = require("../../middlewares/checkToken");

router.post("/:laundryId", checkToken, controller.createOrder);

router.get("/", checkToken, controller.allOrder);

module.exports = router;
