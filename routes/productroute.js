const express = require("express");

const router = express.Router();

const authmiddleware = require("../middleware/authmiddleware");
const adminmiddleware = require("../middleware/adminmiddleware");
const upload = require("../middleware/upload");

const {addProducts,getProducts,getSingleProduct,} = require("../controllers/productController");
// protected
router.post( "/addProducts",authmiddleware, adminmiddleware,upload.single("image"), addProducts);


// public
router.get("/getproducts", getProducts);

router.get("/:id", getSingleProduct);

module.exports = router;