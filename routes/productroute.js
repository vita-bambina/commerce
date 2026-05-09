const express = require("express");

const router = express.Router();

const authMiddleware =
require("../middleware/authMiddleware");

const {createProduct,getProducts,getSingleProduct} = require("../controllers/productController");


// protected
router.post( "/products",authMiddleware,createProduct);


// public
router.get("/getproducts", getProducts);

router.get("/:id", getSingleProduct);

module.exports = router;