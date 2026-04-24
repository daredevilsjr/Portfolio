import mongoose from "mongoose";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    // 🚫 Prevent running in production
    if (process.env.NODE_ENV === "production") {
      console.log("❌ Cannot run admin seeding in production");
      process.exit(1);
    }

    // Connect DB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Check existing admin
    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists:", existingAdmin.email);
      process.exit(0);
    }

    // ✅ Use ENV variables instead of hardcoding
    const adminData = {
      name: process.env.ADMIN_NAME || "Admin User",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      role: "admin",
    };

    // Validate ENV
    if (!adminData.email || !adminData.password) {
      throw new Error("❌ ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    }

    const admin = new User(adminData);
    await admin.save();

    console.log("🎉 Admin created successfully!");
    console.log("Email:", adminData.email);

  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
};

createAdmin();