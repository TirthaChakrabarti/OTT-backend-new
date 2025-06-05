const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/user-details", authMiddleware, userController.getUserIdentity);

router.put("/update", authMiddleware, userController.updateDetails);

router.post("/logout", authMiddleware, (req, res) => {
  res.json({ message: "Logged out successfully!", user: req.user });
});

router.delete("/delete", authMiddleware, userController.deleteAccount);

module.exports = router;
