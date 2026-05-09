const express = require("express");
const router = express.Router();

const {registerUser, loginUser} = require("../controllers/authControllers");

// Register user
router.post("/register", registerUser);
console.log(".....register started....");

// Login user
router.post("/login", loginUser);

module.exports = router;