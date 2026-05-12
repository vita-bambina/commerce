const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
const auth = require("./routes/auth");
const productroute = require("./routes/productroute");
const cartroute = require("./routes/cartroute");
const orderroute = require("./routes/orderroute");

// use routes
app.use("/api/auth", auth);
app.use("/api/products", productroute);
app.use("/api/cart", cartroute);
app.use("/api/orders", orderroute);

// connect database
require("./db");

// test route
app.get("/", (req, res) => {
    res.send("Ecommerce API is running");
});

const fs = require("fs");
const path = require("path");

const uploadDir = path.resolve(__dirname, "uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}


app.listen(4001, () => {
    console.log(`Server running on http://localhost:4001`);
});

