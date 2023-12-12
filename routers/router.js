const express = require("express");
const router = express.Router();

const authAdminRouter = require("./admin/auth.route");
const profileAdminRouter = require("./admin/profile.route");
const layananAdminRouter = require("./admin/layanan.route");
const statusAdminRouter = require("./admin/status.route");
const orderAdminRouter = require("./admin/order.route.js");

const authUserRouter = require("./user/auth.route");
const profileUserRouter = require("./user/profile.route");

const homeLaundry = require("./user/laundri.route");
const orderLaundry = require("./user/order.route");

// Default router
router.get("/", (req, res) => {
  return res.json({
    error: false,
    statusCode: 200,
    message: "Successful access homepage API",
  });
});

// Admin Laundry
router.use("/auth/admin", authAdminRouter);
router.use("/admin/profile", profileAdminRouter);
router.use("/admin/layanan", layananAdminRouter);
router.use("/admin/status", statusAdminRouter);
router.use("/admin/laundry/order", orderAdminRouter);

// User
router.use("/auth/user", authUserRouter);
router.use("/user/profile", profileUserRouter);

// Home
router.use("/laundry", homeLaundry);
router.use("/laundry/order", orderLaundry);
router.use("/laundry/riwayat", orderLaundry);

module.exports = router;
