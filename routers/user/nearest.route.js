const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/nearest.controller");

router.get("/", controller.allLaundryWithNearest);

module.exports = router;
