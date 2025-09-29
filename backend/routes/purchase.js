const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createOrder,
  verifyPayment,
  getCourseBySlug,handlePurchase,
} = require("../controllers/purchaseController");
const {
  validateReferralCode,
} = require("../controllers/referralLinkController");

const referralMiddleware = require("../middleware/referralMiddleware");
const referrerCaptureMiddleware = require("../middleware/referrerCaptureMiddleware");
const purchaseController = require("../controllers/purchaseController");
const { upload } = require("../server");

// Routes
router.post("/create-order", protect, referrerCaptureMiddleware, createOrder);
router.post("/verify", protect, referrerCaptureMiddleware, validateReferralCode, referralMiddleware, verifyPayment);
router.get("/course/:slug", getCourseBySlug);

router.post("/purchase", protect, referrerCaptureMiddleware, referralMiddleware, handlePurchase  );

router.put("/thumbnail/:courseId", protect, upload.single('thumbnail'), purchaseController.updateCourseThumbnail);
module.exports = router;
