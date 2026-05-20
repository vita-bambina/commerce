const prisma = require("../prismaClient");

// CREATE PRODUCT
const addProducts = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file.filename;
  const user_id = req.user.id;

  try {
    const product = await prisma.product.create({
      data: { name,description,price: parseFloat(price),image, user_id
      }
    });

    res.json({
      msg: "Product created",product
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
const getProducts = async (req, res) => {
  const { name, description, price } = req.body;
  const image = req.file.filename;
  const user_id = req.user.id;

  try {
    const product = await prisma.product.create({
      data: {name,description,price: parseFloat(price),image,user_id
      }
    });

    res.json({
      msg: "Product created",product
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
    const { id } = req.params;

  try {
    const product = await prisma.product.findUnique({
      where: {
        id: parseInt(id)
      }
    });

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(product);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {addProducts,getProducts,getSingleProduct};