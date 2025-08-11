const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All field are required",
      });
    }
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name: name, 
      email: email,
      password: hashedPassword,
      role: role,
    })
    await user.save();
    console.log("user created successfully")
    return res.status(201).json({
      success: true,
      message: "User signed up successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error while creating admin user",
      error: error.message,
    });
  }
};

module.exports = { signup };
