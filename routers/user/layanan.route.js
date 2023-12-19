const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/layanan.controller");

router.get("/:laundryId", controller.layananByLaundryId);

module.exports = router;
