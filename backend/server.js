require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const http = require("http");
const { Server } = require("socket.io");
const chatRoutes = require("./routes/chatRoutes");

// Load .env variables
dotenv.config();

// Validate environment variables
const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "RAZORPAY_KEY_ID",
  "RAZORPAY_KEY_SECRET",
  "CLOUDINARY_CLOUD_NAME",
  "CLOUDINARY_API_KEY",
  "CLOUDINARY_API_SECRET",
];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`❌ Missing required environment variable: ${varName}`);
    process.exit(1);
  }
});

// Initialize app
const app = express();

// ✅ Middlewares
app.use(helmet()); // Security headers
app.use(morgan("combined")); // Request logging
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});
app.use("/api/", limiter);

// ✅ Middlewares
const corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(require("cookie-parser")());

// Replace existing Multer configuration block
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log("📁 Created uploads directory at:", uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"));
    }
    cb(null, true);
  },
});
module.exports.upload = upload;

// Add this multer error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error("❌ Multer error:", {
      message: err.message,
      field: err.field,
      code: err.code,
      stack: err.stack,
    });
    return res
      .status(400)
      .json({ success: false, message: `Multer error: ${err.message}` });
  } else if (err) {
    console.error("❌ Upload error:", {
      message: err.message,
      stack: err.stack,
    });
    return res
      .status(500)
      .json({ success: false, message: `Upload error: ${err.message}` });
  }
  next();
});

// ✅ Import routes
const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const adminRoutes = require("./routes/admin");
const userRoutes = require("./routes/user");
const referralRoutes = require("./routes/referral");
const purchaseRoutes = require("./routes/purchase");
const paymentRoutes = require("./routes/payment");
const resetPasswordRoutes = require("./routes/resetPassword");
const uploadRoute = require("./routes/uploadRoute");
const videoRoutes = require("./routes/video");
const cookieParser = require("cookie-parser");
const Contact = require("./models/Contact");
const Message = require("./models/Message");
const leaderboardRoutes = require("./routes/leaderboard");

const contactRoutes = require("./routes/contact");
// Add this at the top, after the imports
if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
  console.log("📁 Created uploads directory");
}

// ✅ Use routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes); // ✅ User routes
app.use("/api/referral", referralRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", resetPasswordRoutes);
app.use("/api/videos", uploadRoute);
app.use("/api/videos", videoRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use(cookieParser());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/contact", contactRoutes);

// ✅ Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date(),
  });
});

// ✅ Connect MongoDB
const mongoURI = process.env.MONGO_URI;
const dbName = "E-COMMERCE"; // Your DB name
const fullMongoURI = `${mongoURI}${dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(fullMongoURI)
  .then(async () => {
    console.log(`✅ MongoDB connected to database: ${dbName}`);

    // ✅ Sync referral indexes once on startup
    const Referral = require("./models/Referral");
    await Referral.syncIndexes();
    console.log("✅ Referral indexes synced");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit if connection fails
  });

// ✅ Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ✅ Start server
// Replace existing app.listen block
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// ✅ Socket.io Setup for Real-time Chat
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  // ✅ User joins a room (admin or private)
  socket.on("joinRoom", ({ room, userName }) => {
    socket.join(room);
    socket.userName = userName;
    socket.room = room;

    // Register user in active list
    activeUsers.set(socket.id, { id: socket.id, userName });
    io.emit("activeUsers", Array.from(activeUsers.values()));

    console.log(`${userName} joined room: ${room}`);
  });

  // 1️⃣ sendMessage (user → admin)
  socket.on("sendMessage", async ({ room, userName, message }) => {
    const msg = {
      user: userName,
      text: message,
      room,
      createdAt: new Date(),
    };
    await Message.create(msg);

    // Emit to all in room (including admin if joined)
    io.to(room).emit("receiveMessage", {
      userName,
      message,
      timestamp: msg.createdAt.getTime(),
      room,
    });

    // ALSO emit to admin general dashboard if room is private
    if (room.startsWith("private_")) {
      io.to("general").emit("receiveMessage", {
        userName,
        message,
        timestamp: msg.createdAt.getTime(),
        room,
      });
    }
  });

  // 2️⃣ adminReply (admin → user)
  socket.on("adminReply", async ({ room, message, userName }) => {
    try {
      const msg = {
        user: userName, // Admin
        text: message,
        room, // must match private_${userId}
        createdAt: new Date(),
      };

      await Message.create(msg);

      // Emit to user room
      io.to(room).emit("receiveMessage", {
        userName,
        message,
        timestamp: msg.createdAt.getTime(),
        room,
      });

      // Optional: update admin dashboard
      io.to("general").emit("receiveMessage", {
        userName,
        message,
        timestamp: msg.createdAt.getTime(),
        room,
      });
    } catch (err) {
      console.error("❌ adminReply error:", err.message);
    }
  });

  // 3️⃣ ensure admin joins general room at connection
  socket.on("joinRoom", ({ room, userName }) => {
    socket.join(room);
    socket.userName = userName;
    socket.room = room;

    // If admin, also join 'general' room
    if (userName === "Admin") {
      socket.join("general");
    }

    activeUsers.set(socket.id, { id: socket.id, userName });
    io.emit("activeUsers", Array.from(activeUsers.values()));
  });

  // adminBroadcast handler (same)
  socket.on("adminBroadcast", async (data) => {
    const { message, userName, room, timestamp } = data;
    const msg = {
      user: userName,
      text: message,
      room: "general",
      createdAt: new Date(timestamp),
    };
    await Message.create(msg);
    io.emit("receiveMessage", { ...msg, userName, message });
    console.log(`📢 Broadcast sent: ${message}`);
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
    activeUsers.delete(socket.id);
    io.emit("activeUsers", Array.from(activeUsers.values()));
  });
});

const gracefulShutdown = () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log(
        "✅ MongoDB connection closed due to application termination"
      );
      process.exit(0);
    });
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err);
  gracefulShutdown();
});
