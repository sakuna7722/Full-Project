// backend/models/Chat.js
const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  room: {
    type: String,
    required: true,
    default: 'general'
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  userName: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true // CreatedAt/UpdatedAt auto add
});

// Index for fast query (room + timestamp)
chatSchema.index({ room: 1, timestamp: -1 });

module.exports = mongoose.model('Chat', chatSchema);