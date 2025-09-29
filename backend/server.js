require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load .env variables
dotenv.config();


// Validate environment variables
const requiredEnvVars = ['PORT', 'MONGO_URI', 'JWT_SECRET', 'RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'];
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
app.use(morgan('combined')); // Request logging
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// ✅ Middlewares
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Replace existing Multer configuration block
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
      console.log('📁 Created uploads directory at:', uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only images allowed'));
    }
    cb(null, true);
  }
});
module.exports.upload = upload;

// Add this multer error handling middleware
// Replace existing Multer error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('❌ Multer error:', {
      message: err.message,
      field: err.field,
      code: err.code,
      stack: err.stack,
    });
    return res.status(400).json({ success: false, message: `Multer error: ${err.message}` });
  } else if (err) {
    console.error('❌ Upload error:', {
      message: err.message,
      stack: err.stack,
    });
    return res.status(500).json({ success: false, message: `Upload error: ${err.message}` });
  }
  next();
});

// ✅ Import routes
const authRoutes = require('./routes/auth');        
const courseRoutes = require('./routes/courses');  
const adminRoutes = require('./routes/admin');     
const userRoutes = require('./routes/user');
const referralRoutes = require('./routes/referral'); 
const purchaseRoutes = require('./routes/purchase');
const paymentRoutes = require('./routes/payment');
// const dashboardRoutes = require('./routes/dashboard');
const resetPasswordRoutes = require("./routes/resetPassword");
const uploadRoute = require("./routes/uploadRoute");
const videoRoutes = require("./routes/video");
const cookieParser = require('cookie-parser');
const Contact = require('./models/Contact'); // Keep for model usage if needed

const contactRoutes = require('./routes/contact');
// Add this at the top, after the imports
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
  console.log('📁 Created uploads directory');
}

// ✅ Use routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes); 
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes); // ✅ User routes
app.use('/api/referral', referralRoutes); // ✅ Referral route
app.use('/api/purchase', purchaseRoutes); // ✅ Purchase route
app.use('/api/payment', paymentRoutes);
// app.use('/api/dashboard', dashboardRoutes);
app.use("/api/auth", resetPasswordRoutes);
app.use("/api/videos", uploadRoute);
app.use('/api/videos', videoRoutes);
app.use(cookieParser());
// Serve uploads folder as static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/contact', contactRoutes);

// ✅ Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy', timestamp: new Date() });
});



// ✅ Connect MongoDB
const mongoURI = process.env.MONGO_URI;
const dbName = 'E-COMMERCE'; // Your DB name
const fullMongoURI = `${mongoURI}${dbName}?retryWrites=true&w=majority`;

mongoose.connect(fullMongoURI)
  .then(async () => {
    console.log(`✅ MongoDB connected to database: ${dbName}`);

    // ✅ Sync referral indexes once on startup
    const Referral = require('./models/Referral');
    await Referral.syncIndexes();
    console.log("✅ Referral indexes synced");
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // Exit if connection fails
  });


// ✅ Error handling middleware (optional but recommended)
app.use((err, req, res, next) => {
  console.error('Server error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ✅ Start server
// Replace existing app.listen block
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const gracefulShutdown = () => {
  server.close(() => {
    mongoose.connection.close(false, () => {
      console.log('✅ MongoDB connection closed due to application termination');
      process.exit(0);
    });
  });
};

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown();
});