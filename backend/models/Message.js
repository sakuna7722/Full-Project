// backend/models/Message.js
const mongoose = require('mongoose');

// Message Schema
const messageSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  room: {
    type: String,
    default: 'general', // default chat room
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


module.exports = mongoose.model('Message', messageSchema);
