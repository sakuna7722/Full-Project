// backend/routes/chatRoutes.js
const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify admin
const authAdmin = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user || !user.isAdmin) return res.status(403).json({ message: 'Admin only' });
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// GET messages for a room (admin or normal)
router.get('/messages', async (req, res) => {  // ← authAdmin हटाओ, या optional बनाओ
  try {
    const { room, limit = 50 } = req.query;
    if (!room) return res.status(400).json({ message: 'Room is required' });

    const messages = await Message.find({ room })
      .sort({ createdAt: 1 })  // ← timestamp को createdAt में change
      .limit(parseInt(limit))
      .lean();  // Faster query

    // Response में original fields map back for frontend
    const formattedMessages = messages.map(m => ({
      ...m,
      userName: m.user,
      message: m.text,
      timestamp: m.createdAt.getTime()
    }));

    res.json({ success: true, messages: formattedMessages });
  } catch (err) {
    console.error('Error fetching chat messages:', err);
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
});

module.exports = router;
