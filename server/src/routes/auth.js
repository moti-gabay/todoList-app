const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_in_production";
const TOKEN_EXPIRY = "7d";

// POST /api/auth/register
router.post("/register", async (req, res) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Invalid email address." });
  }
  if (typeof password !== "string" || password.length < 6) {
    return res.status(400).json({ error: "Password must be at least 6 characters." });
  }
  if (typeof name !== "string" || name.trim().length < 2) {
    return res.status(400).json({ error: "Name must be at least 2 characters." });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ error: "An account with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name: name.trim(), email, password: hashedPassword });

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    res.status(500).json({ error: "Registration failed." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Login failed." });
  }
});

module.exports = router;
