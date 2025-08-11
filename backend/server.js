const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const app = express();

dotenv.config();
const PORT = process.env.PORT || 5000;
const authRoute = require('./routes/authRoute');
const adminRoute = require('./routes/adminRoute');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ message: "Server is running!" });
});
app.use('/auth', authRoute);
app.use('/admin', adminRoute);
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  connectDB();
});
