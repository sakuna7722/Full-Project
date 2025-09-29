//backend/routes/admin.js :
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Purchase = require('../models/Purchase');
const Course = require('../models/Course');
const Contact = require('../models/Contact');

// Middleware to verify JWT and admin status
const authAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  console.log('AuthAdmin middleware triggered with token:', token ? 'Present' : 'Absent'); // Log token presence
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decoded, user ID:', decoded.id); // Log decoded user ID
    const user = await User.findById(decoded.id);
    if (!user) {
      console.log('User not found for ID:', decoded.id);
      return res.status(403).json({ message: 'User not found' });
    }
    if (!user.isAdmin) {
      console.log('User is not admin, denying access:', user.email);
      return res.status(403).json({ message: 'Access denied, admin only' });
    }
    req.user = user;
    console.log('Admin authenticated:', user.email); // Log successful auth
    next();
  } catch (err) {
    console.error('Admin token verification error:', err.message, 'Token:', token);
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.get('/dashboard', authAdmin, async (req, res) => {
  try {
    console.log('Fetching dashboard stats for user:', req.user.email); 

    const totalSales = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
      { $project: { total: { $round: ["$total", 2] } } } // 👈 rounding
    ]).then(r => r[0]?.total || 0);

    const totalCommission = await Purchase.aggregate([
      { $group: { _id: null, total: { $sum: "$commissionEarned" } } },
      { $project: { total: { $round: ["$total", 2] } } }
    ]).then(r => r[0]?.total || 0);

    const totalAffiliates = await User.countDocuments({ affiliateId: { $exists: true } });

    console.log('Dashboard stats fetched:', { totalSales, totalCommission, totalAffiliates });

    res.json({
      totalSales,
      totalCommission,
      totalAffiliates,
    });
  } catch (err) {
    console.error('Error fetching dashboard stats for user:', req.user?.email || 'Unknown', err.message);
    res.status(500).json({ message: 'Failed to fetch dashboard stats' });
  }
});


// Sales data
router.get('/sales', authAdmin, async (req, res) => {
  try {
    console.log('Fetching sales data for user:', req.user.email);

    let sales = await Purchase.find()
      .populate('user', 'firstName email')
      .populate('course', 'title')
      .populate('referredBy', 'firstName');

    console.log('Sales data fetched, count:', sales.length);

    // Format kar do response bhejne se pehle
    sales = sales.map(sale => {
      const obj = sale.toObject();

      // Amount aur Commission ko round karo
      obj.amount = Math.floor(obj.amount || 0);
      obj.commissionEarned = Math.floor(obj.commissionEarned || 0);

      return obj;
    });

    res.json(sales);
  } catch (err) {
    console.error(
      'Error fetching sales for user:',
      req.user?.email || 'Unknown',
      err.message
    );
    res.status(500).json({ message: 'Failed to fetch sales' });
  }
});



// Affiliates data
router.get('/affiliates', authAdmin, async (req, res) => {
  try {
    console.log('Fetching affiliates data for user:', req.user.email); // Log user
    const affiliates = await User.aggregate([
      { $match: { affiliateId: { $exists: true } } },
      {
        $lookup: {
          from: 'purchases',
          localField: '_id',
          foreignField: 'referredBy',
          as: 'referrals'
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          email: 1,
          salesCount: { $size: '$referrals' },
          totalCommission: { $sum: '$referrals.commissionEarned' },
          lastSaleAt: { $max: '$referrals.createdAt' }
        }
      }
    ]);
    console.log('Affiliates data fetched, count:', affiliates.length); // Log count
    res.json(affiliates);
  } catch (err) {
    console.error('Error fetching affiliates for user:', req.user?.email || 'Unknown', err.message);
    res.status(500).json({ message: 'Failed to fetch affiliates' });
  }
});



router.get('/courses', authAdmin, async (req, res) => {
  try {
    console.log('Fetching courses data for user:', req.user.email);

    const courses = await Course.aggregate([
      {
        $lookup: {
          from: 'purchases',
          localField: '_id',
          foreignField: 'course',
          as: 'sales'
        }
      },
      {
        $project: {
          _id: 1,
          name: 1, // ✅ Course name dikhayega
          salesCount: { $size: '$sales' },
          totalRevenue: { $floor: { $sum: "$sales.amount" } },
          totalCommission: { $floor: { $sum: "$sales.commissionEarned" } }
        }
      }
    ]);

    console.log('Courses data fetched, count:', courses.length);
    res.json(courses);

  } catch (err) {
    console.error(
      'Error fetching courses for user:',
      req.user?.email || 'Unknown',
      err.message
    );
    res.status(500).json({ message: 'Failed to fetch courses' });
  }
});




// Existing admin route
router.put('/users/:userId/admin', authAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    const { isAdmin } = req.body;
    console.log('Updating admin status for user:', userId, 'to:', isAdmin); // Log request

    if (typeof isAdmin !== 'boolean') return res.status(400).json({ message: 'isAdmin must be a boolean' });

    const user = await User.findById(userId);
    if (!user) {
      console.log('User not found:', userId);
      return res.status(404).json({ message: 'User not found' });
    }

    user.isAdmin = isAdmin;
    await user.save();
    console.log('Admin status updated for:', user.email); // Log success

    res.json({ success: true, message: `User ${user.email} admin status updated to ${isAdmin}` });
  } catch (error) {
    console.error('Error updating admin status for user:', userId, error.message);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add a new video to a course (Admin only)
router.post('/courses/:id/videos', authAdmin, async (req, res) => {
  try {
    const { title, url } = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.videos.push({ title, url });
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to fetch contact messages
router.get('/contacts', authAdmin, async (req, res) => {
  try {
    console.log('Fetching contact messages for user:', req.user.email);
    const contacts = await Contact.find().sort({ createdAt: -1 }); // Sort by newest first
    console.log('Contact messages fetched, count:', contacts.length);
    res.json(contacts);
  } catch (err) {
    console.error('Error fetching contact messages for user:', req.user?.email || 'Unknown', err.message);
    res.status(500).json({ message: 'Failed to fetch contact messages' });
  }
});


module.exports = router;