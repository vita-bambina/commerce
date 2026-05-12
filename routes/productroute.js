const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const upload = require("../middleware/upload");

const {addProducts,getProducts,getSingleProduct,} = require("../controllers/productController");
// protected
router.post( "/addProducts",authMiddleware, adminMiddleware,upload.single("image"), addProducts);


// public
router.get("/getproducts", getProducts);

router.get("/:id", getSingleProduct);

module.exports = router;