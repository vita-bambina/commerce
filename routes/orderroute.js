const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {checkout} = require("../controllers/orderController");


router.post("/checkout",authMiddleware,checkout);

module.exports = router;