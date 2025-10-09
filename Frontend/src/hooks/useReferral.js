// // 1️⃣ sendMessage (user → admin)
// socket.on("sendMessage", async ({ room, userName, message }) => {
//   const msg = {
//     user: userName,
//     text: message,
//     room,
//     createdAt: new Date(),
//   };
//   await Message.create(msg);

//   // Emit to all in room (including admin if joined)
//   io.to(room).emit("receiveMessage", {
//     userName,
//     message,
//     timestamp: msg.createdAt.getTime(),
//     room,
//   });

//   // ALSO emit to admin general dashboard if room is private
//   if (room.startsWith("private_")) {
//     io.to("general").emit("receiveMessage", {
//       userName,
//       message,
//       timestamp: msg.createdAt.getTime(),
//       room,
//     });
//   }
// });

// // 2️⃣ adminReply (admin → user)
// socket.on("adminReply", async ({ room, message, userName }) => {
//   try {
//     const msg = {
//       user: userName, // Admin
//       text: message,
//       room, // must match private_${userId}
//       createdAt: new Date(),
//     };

//     await Message.create(msg);

//     // Emit to user room
//     io.to(room).emit("receiveMessage", {
//       userName,
//       message,
//       timestamp: msg.createdAt.getTime(),
//       room,
//     });

//     // Optional: update admin dashboard
//     io.to("general").emit("receiveMessage", {
//       userName,
//       message,
//       timestamp: msg.createdAt.getTime(),
//       room,
//     });

//   } catch (err) {
//     console.error("❌ adminReply error:", err.message);
//   }
// });

// // 3️⃣ ensure admin joins general room at connection
// socket.on("joinRoom", ({ room, userName }) => {
//   socket.join(room);
//   socket.userName = userName;
//   socket.room = room;

//   // If admin, also join 'general' room
//   if (userName === "Admin") {
//     socket.join("general");
//   }

//   activeUsers.set(socket.id, { id: socket.id, userName });
//   io.emit("activeUsers", Array.from(activeUsers.values()));
// });
