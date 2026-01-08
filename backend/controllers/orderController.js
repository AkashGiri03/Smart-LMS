import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const checkout = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.course");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  const items = cart.items.map((item) => ({
    course: item.course._id,
    price: item.course.price,
  }));

  const totalAmount = items.reduce(
    (sum, item) => sum + item.price,
    0
  );

  const order = new Order({
    user: req.user._id,
    items,
    totalAmount,
  });

  await order.save();

  // Clear cart after checkout
  cart.items = [];
  await cart.save();

  res.json(order);
};
