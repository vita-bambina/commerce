const db = require("../db");


// ADD TO CART
const addToCart = (req, res) => {

    const { product_id, quantity } = req.body;

    const user_id = req.user.id;

    db.query(
        "INSERT INTO cart(user_id,product_id,quantity) VALUES(?,?,?)",
        [
            user_id,
            product_id,
            quantity
        ],
        (err, data) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                msg: "Added to cart"
            });
        }
    );
};


// GET USER CART
const getCart = (req, res) => {

    const user_id = req.user.id;

    db.query(
        `SELECT cart.id,
                products.name,
                products.price,
                cart.quantity
         FROM cart
         JOIN products
         ON cart.product_id = products.id
         WHERE cart.user_id = ?`,
        [user_id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};


module.exports = {
    addToCart,
    getCart
};