const prisma = require("../prismaClient");
// ADD TO CART
const addToCart = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user.id;

  try {
    const cartItem = await prisma.cart.create({
      data: {
        user_id,
        product_id,
        quantity
      }
    });

    res.json({
      msg: "Added to cart",
      cartItem
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET CART
const getCart = async (req, res) => {
  const user_id = req.user.id;

  try {
    const cart = await prisma.cart.findMany({
      where: {
        user_id
      },
      include: {
        product: true   // this replaces SQL JOIN
      }
    });

    const formattedCart = cart.map(item => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity
    }));

    res.json(formattedCart);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {addToCart,getCart};