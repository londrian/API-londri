const express = require("express");
const router = express.Router();
const controller = require("../../controllers/user/laundri.controller");

router.get("/", controller.allLaundry);
router.get("/detail/:laundryId", controller.detailLaundry);
router.get("/search", controller.searchLaundry);

module.exports = router;
