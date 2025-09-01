require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Add it back when communicating with react
const logger = require("morgan");
const mongoose = require("mongoose");

const app = express();

// Mounting necessary middlewares.
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

const corsOptions = {
  origin: ["http://localhost:5173", "https://sagey.in", "https://www.sagey.in"],
  //  origin: "http://localhost:5173",
  credentials: true, // Allow cookies
  optionsSuccessStatus: 200, // Response for preflight requests
};

app.use(cors(corsOptions));




// Handling preflight requests manually
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header(
      "Access-Control-Allow-Methods",
      "POST, GET, OPTIONS, PUT, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Origin, Authorization"
    );
    return res.status(200).json({});
  }
  next();
});

// Loading Routes
const userRoutes = require("./routes/user");
const adminRoutes = require("./routes/admin");
const superAdminRoutes = require("./routes/superAdmin");
const publicRoutes = require("./routes/public");
const authRoutes = require("./routes/auth");

// Auth middleware

const { requireAuth, requireAdminAuth } = require("./middleware/requireAuth");

// Mounting the routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/admin", requireAdminAuth, adminRoutes);
// app.use("/api/super-admin", requireAdminAuth, superAdminRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/super-admin", superAdminRoutes);
app.use("/api/public", publicRoutes);

// Public Api for accessing images
app.use("/api/img", express.static(__dirname + "/public/products/"));
app.use("/api/off", express.static(__dirname + "/public/official/"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Listening on Port: ${process.env.PORT} - DB Connected`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
