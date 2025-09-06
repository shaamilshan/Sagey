require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json({ limit: '10mb' }));
app.use(logger("dev"));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../client/dist')));

const corsOptions = {
  origin: ["http://localhost:5173", "https://sagey.in", "https://www.sagey.in"],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Handling preflight requests manually
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Origin, Authorization");
    return res.status(200).json({});
  }
  next();
});

// Simple test routes
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running!', 
    timestamp: new Date(),
    status: 'OK'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working!' });
});

// Try to load routes if they exist
try {
  const userRoutes = require("./routes/user");
  const adminRoutes = require("./routes/admin");
  const superAdminRoutes = require("./routes/superAdmin");
  const publicRoutes = require("./routes/public");
  const authRoutes = require("./routes/auth");

  // Mounting the routes
  app.use("/api/auth", authRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/super-admin", superAdminRoutes);
  app.use("/api/public", publicRoutes);

  console.log("All routes loaded successfully");
} catch (error) {
  console.log("Error loading routes:", error.message);
}

// Public Api for accessing images
app.use("/api/img", express.static(__dirname + "/public/products/"));
app.use("/api/off", express.static(__dirname + "/public/official/"));

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, '0.0.0.0', () => {
      console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
