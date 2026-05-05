const express = require("express");
const router = express.Router();

const {
  login,
  signup
} = require("../controllers/authController");

// LOGIN ROUTE
router.post("/login", login);

// SIGNUP ROUTE
router.post("/signup", signup);

module.exports = router;