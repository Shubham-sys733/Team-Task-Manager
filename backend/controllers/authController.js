const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.status(200).json({
    token: generateToken(user),
    user
  });
};

// SIGNUP (FIXED - ASSESSMENT READY)
exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // 1. check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 2. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee"
    });

    // 4. send token (IMPORTANT FOR FRONTEND)
    res.status(201).json({
      token: generateToken(user),
      user
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
};