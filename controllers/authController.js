// controllers/authController.js
const db = require("../models");
const jwt = require("jsonwebtoken");

// Register new user or reactivate deleted user
exports.register = async (req, res) => {
  const { name, email, phone } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required" });
  }

  try {
    const existing = await db.User.findOne({ where: { phone } });

    if (existing) {
      if (existing.status === 1) {
        return res.status(400).json({ message: "User already registered" });
      } else {
        await existing.update({ name, email, status: 1 });
        const token = jwt.sign({ id: existing.id }, process.env.JWT_SECRET_KEY);
        return res.status(201).json({ message: "User reactivated", token });
      }
    }

    const newUser = await db.User.create({ name, email, phone });
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET_KEY);
    return res
      .status(201)
      .json({ message: "User registered successfully", token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// Login user with mock OTP
exports.login = async (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res
      .status(400)
      .json({ message: "Phone number and OTP are required" });
  }

  try {
    const user = await db.User.findOne({ where: { phone } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.status === 0) {
      return res.status(401).json({ message: "Account deleted" });
    }

    if (otp !== "1234") {
      return res.status(401).json({ message: "Incorrect OTP" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY);
    return res.json({ token });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
