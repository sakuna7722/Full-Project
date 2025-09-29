const Referral = require("../models/Referral");
const User = require("../models/User");
const Purchase = require("../models/Purchase");
const Commission = require("../models/Commission");

exports.getReferralMetrics = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      console.log("❌ User not found with ID:", req.user._id);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    console.log("👤 User found:", user.email);

    const referredUsers = await User.find({ referredBy: user._id });
    const activeReferrals = referredUsers.filter((u) => u.hasPurchased);

    // ✅ Step 1: Date ranges FIRST
    const now = new Date();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const last7Days = new Date();
    last7Days.setDate(now.getDate() - 7);

    const last30Days = new Date();
    last30Days.setDate(now.getDate() - 30);

  
    // Step 2: Helper function only ONCE
    const calcEarnings = (purchases) =>
      purchases.reduce((total, purchase) => {
        if (!purchase.course) return total;
        const commissionRate =
          purchase.course.affiliateCommission ??
          parseFloat(process.env.COMMISSION_RATE) ??
          60;

        // ✅ Ensure price is always a number
        const price = Number(purchase.course.price) || 0;

        const commission = Math.floor((price * commissionRate) / 100);

        console.log(
          `💰 Commission for course "${purchase.course.title}": ₹${commission}`
        );
        return total + commission;
      }, 0);

    // Step 3: Fetch purchases
    const purchases = await Purchase.find({ affiliate: user._id }).populate("course");

    const todayPurchases = purchases.filter(
      (p) => new Date(p.createdAt) >= startOfToday
    );
    const purchases7Days = purchases.filter(
      (p) => new Date(p.createdAt) >= last7Days
    );
    const purchases30Days = purchases.filter(
      (p) => new Date(p.createdAt) >= last30Days
    );

    // Correct usage of purchases instead of allPurchases
    const allTimeEarningsFromPurchases = calcEarnings(purchases);

    const referrals = await Referral.find({ referredBy: user._id });
    // Filter referrals by date range
    const todayReferrals = referrals.filter(
      (r) => new Date(r.createdAt) >= startOfToday
    );
    const last7Referrals = referrals.filter(
      (r) => new Date(r.createdAt) >= last7Days
    );
    const last30Referrals = referrals.filter(
      (r) => new Date(r.createdAt) >= last30Days
    );

    // Calculate total commission from a referral list
    const calcReferralEarnings = (refList) =>
      refList.reduce((sum, r) => sum + (r.commissionEarned || 0), 0);

    const allTimeEarningsFromReferrals = referrals.reduce(
      (sum, r) => sum + (r.commissionEarned || 0),
      0
    );
    const todayReferralEarnings = calcReferralEarnings(todayReferrals);
    const last7ReferralEarnings = calcReferralEarnings(last7Referrals);
    const last30ReferralEarnings = calcReferralEarnings(last30Referrals);
    const allTimeEarnings =
      allTimeEarningsFromPurchases + allTimeEarningsFromReferrals;


    const todayEarnings =
  calcEarnings(todayPurchases) + todayReferralEarnings;

const last7DaysEarnings =
  calcEarnings(purchases7Days) + last7ReferralEarnings;

const last30DaysEarnings =
  calcEarnings(purchases30Days) + last30ReferralEarnings;

    console.log(
      `🧾 Earnings: AllTime: ₹${allTimeEarnings}, Today: ₹${todayEarnings}, Last 7 Days: ₹${last7DaysEarnings}, Last 30 Days: ₹${last30DaysEarnings}`
    );

    // 📊 Final response
    const metrics = {
      success: true,
      affiliateId: user.affiliateId,
      referralCode: user.referralCode,
      
      status: user.isActive ? "active" : "pending",

      // From Purchases
      allTimeEarnings,
      todayEarnings,
      last7DaysEarnings,
      last30DaysEarnings,
      accountBalance: user.affiliateEarnings || allTimeEarnings,
      commissionPaid: 0,
      totalCommission: allTimeEarnings,
      totalReferrals: referredUsers.length,
      totalActiveReferrals: activeReferrals.length,

      // From Referrals
      allTimeEarningsFromReferrals,
      todayReferralEarnings,
      last7ReferralEarnings,
      last30ReferralEarnings,
    };

    console.log(`✅ Final metrics for ${user.email}:`);
    

    res.json(metrics);
  } catch (error) {
    console.error("❌ Error in getReferralMetrics:", error);
    res.status(500).json({
      success: false,
      message: "Server error in referral metrics",
      error: error.message,
    });
  }
};
