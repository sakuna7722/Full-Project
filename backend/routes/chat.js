// backend/routes/chat.js
const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');
const { protect, admin } = require('../middleware/authMiddleware'); // Admin protect

// GET /api/chat/messages?room=general&limit=50 – Last messages load
router.get('/messages', protect, admin, async (req, res) => {
  try {
    const { room = 'general', limit = 50 } = req.query;
    const messages = await Chat.find({ room })
      .sort({ timestamp: -1 }) // Latest first
      .limit(parseInt(limit))
      .select('room message userName timestamp createdAt'); // Relevant fields

    res.status(200).json({ success: true, messages: messages.reverse() }); // Reverse for chronological order
  } catch (err) {
    console.error('❌ Chat messages error:', err);
    res.status(500).json({ success: false, message: 'Failed to load messages' });
  }
});

module.exports = router;