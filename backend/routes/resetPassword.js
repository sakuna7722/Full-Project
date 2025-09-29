const express = require("express");
const router = express.Router();
const resetPasswordController = require("../controllers/resetPasswordController");

router.post("/forgot-password", resetPasswordController.forgotPassword);
router.post("/reset-password", resetPasswordController.resetPassword);

module.exports = router;