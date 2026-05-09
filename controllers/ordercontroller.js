const db = require("../db");


// CHECKOUT
const checkout = (req, res) => {

    const user_id = req.user.id;

    // get cart items
    db.query(
        `SELECT cart.*,
                products.price
         FROM cart
         JOIN products
         ON cart.product_id = products.id
         WHERE cart.user_id = ?`,
        [user_id],
        (err, cartItems) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (cartItems.length === 0) {
                return res.json({
                    msg: "Cart is empty"
                });
            }

            // calculate total
            let total = 0;

            cartItems.forEach(item => {
                total +=
                    item.price * item.quantity;
            });

            // create order
            db.query(
                "INSERT INTO orders(user_id,total) VALUES(?,?)",
                [user_id, total],
                (err, orderData) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    const order_id =
                    orderData.insertId;

                    // insert order items
                    cartItems.forEach(item => {

                        db.query(
                            `INSERT INTO order_items
                            (order_id,product_id,quantity,price)
                            VALUES(?,?,?,?)`,
                            [
                                order_id,
                                item.product_id,
                                item.quantity,
                                item.price
                            ]
                        );
                    });

                    // clear cart
                    db.query(
                        "DELETE FROM cart WHERE user_id = ?",
                        [user_id]
                    );

                    res.json({
                        msg: "Checkout successful"
                    });
                }
            );
        }
    );
};


module.exports = {
    checkout
};