const prisma = require("../prismaClient");

const checkout = async (req, res) => {
  const user_id = req.user.id;

  try {
    // 1. get cart items
    const cartItems = await prisma.cart.findMany({
      where: { user_id },
      include: { product: true }
    });

    if (cartItems.length === 0) {
      return res.json({ msg: "Cart is empty" });
    }

    // 2. calculate total
    let total = 0;

    cartItems.forEach(item => {
      total += item.product.price * item.quantity;
    });

    // 3. create order
    const order = await prisma.order.create({
      data: { user_id,total}
    });

    // 4. create order items
    for (const item of cartItems) {
      await prisma.order_Item.create({
        data: {
          order_id: order.id,
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price,
          vat: 0
        }
      });
    }

    // 5. clear cart
    await prisma.cart.deleteMany({
      where: { user_id }
    });

    return res.json({ msg: "Checkout successful" });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { checkout };