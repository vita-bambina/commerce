const db = require("../db");


// CREATE PRODUCT
const addProducts = (req, res) => {

    const { name, description, price } = req.body;
const image = req.file.filename;

    const user_id = req.user.id;

    db.query("INSERT INTO products(name,description,price,image,user_id) VALUES(?,?,?,?,?)" , [name,description,price,image,user_id],
        (err, data) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                msg: "Product created"
            });
        }
    );
};

const getProducts = (req, res) => {
    db.query("SELECT * FROM products",(err, result) => {
            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
};


// GET SINGLE PRODUCT
const getSingleProduct = (req, res) => {

    const { id } = req.params;

    db.query("SELECT * FROM products WHERE id = ?",[id],
        (err, result) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.json(result[0]);
        }
    );
};


module.exports = {addProducts,getProducts,getSingleProduct};