const express = require("express");
const router = express.Router();

const authAdminRouter = require("./admin/auth.route");
const profileAdminRouter = require("./admin/profile.route");

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

module.exports = router;
