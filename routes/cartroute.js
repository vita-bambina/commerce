const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const { addToCart, getCart} = 
require("../controllers/cartController");

router.post( "/add", authMiddleware,addToCart);

router.get( "/getitems", authMiddleware,getCart);

module.exports = router;