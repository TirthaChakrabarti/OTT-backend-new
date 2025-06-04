// controllers/userController.js
const db = require("../models");

// Update user profile
exports.updateDetails = async (req, res) => {
  const { name, email, phone, birthdate, gender } = req.body;
  const userId = req.user.id;

  const updates = { name, email, phone, birthdate, gender };
  const validUpdates = Object.entries(updates).filter(
    ([_, v]) => v !== undefined && v !== null
  );

  if (validUpdates.length === 0) {
    return res.status(400).json({ message: "At least one field is required" });
  }

  try {
    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    for (const [key, value] of validUpdates) {
      user[key] = value;
    }
    await user.save();

    res.status(200).json({ message: "Details updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Soft delete user account
exports.deleteAccount = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await db.User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.status = 0;
    await user.save();

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};
