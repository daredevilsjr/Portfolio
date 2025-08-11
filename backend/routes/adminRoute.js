// routes/adminRoutes.js
const express = require("express");
const authenticateAdmin = require("../middleware/auth");

const router = express.Router();

// Apply middleware to ALL admin routes
router.use(authenticateAdmin);

router.get("/dashboard", (req, res) => {
  res.json({ message: `Welcome Admin: ${req.user.name}` });
});

module.exports = router;
