// backend/controllers/chatController.js

const mongoose = require('mongoose');
const Chat = require('../models/Chat'); // ← Yeh add karo (model require, definition nahi)

let activeUsers = [];

const initSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("👤 User connected:", socket.id);

    socket.on("joinRoom", (data) => {
      socket.join(data.room);
      socket.to(data.room).emit("userJoined", { user: data.userName });
      console.log(`User ${data.userName} joined room: ${data.room}`);
    });

    socket.on("sendMessage", async (data) => {
      // Save to DB
      const newMessage = new Chat(data);
      await newMessage.save();

      io.to(data.room).emit("receiveMessage", { ...data });
      console.log(`Message from ${data.userName}: ${data.message}`);
    });
    // ← Naya: Add user to online list
    socket.on("addUser", (userData) => {
      activeUsers.push({ id: socket.id, ...userData });
      io.emit("activeUsers", activeUsers); // Sabko list bhejo
      console.log(`👥 Added user: ${userData.userName}`);
    });

    // ← Naya: Admin private reply
    socket.on("adminReply", async (data) => {
      const newMessage = new Chat(data);
      await newMessage.save();

      io.to(data.room).emit("receiveMessage", { ...data }); 
      console.log(`Reply from admin: ${data.message} to ${data.room}`);
    });

    socket.on("disconnect", () => {
      activeUsers = activeUsers.filter((user) => user.id !== socket.id);
      io.emit("activeUsers", activeUsers); // Updated list bhejo
      console.log("👤 User disconnected:", socket.id);
    });
  });
};

module.exports = { initSocket };