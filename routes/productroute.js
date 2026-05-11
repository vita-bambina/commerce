const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {createProduct,getProducts,getSingleProduct} = require("../controllers/productController");


// protected
router.post( "/products",authMiddleware,createProduct);
router.post("/add", authMiddleware, adminMiddleware, addProduct);


// public
router.get("/getproducts", getProducts);

router.get("/:id", getSingleProduct);

module.exports = router;