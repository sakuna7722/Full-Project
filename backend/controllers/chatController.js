const Message = require('../models/Message'); 

// Get all messages
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Post a new message
const postMessage = async (req, res) => {
  try {
    const { user, text } = req.body;
    const newMessage = await Message.create({ user, text });
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { getMessages, postMessage };
