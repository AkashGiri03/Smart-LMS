import Cart from "../models/Cart.js";

// Get user's cart
export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.course");

  if (!cart) {
    return res.json({ items: [] });
  }

  res.json({ items: cart.items });
};

// Add course to cart
export const addToCart = async (req, res) => {
  const { courseId } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ course: courseId }],
    });
  } else {
    const exists = cart.items.find(
      (item) => item.course.toString() === courseId
    );

    if (exists) {
      return res.status(400).json({ message: "Course already in cart" });
    }

    cart.items.push({ course: courseId });
  }

  await cart.save();

  await cart.populate("items.course");
  res.json({ items: cart.items });
};

// Remove course from cart
export const removeFromCart = async (req, res) => {
  const { courseId } = req.params;

  const cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    return res.status(404).json({ message: "Cart not found" });
  }

  cart.items = cart.items.filter(
    (item) => item.course.toString() !== courseId
  );

  await cart.save();

  await cart.populate("items.course");
  res.json({ items: cart.items });
};

// Merge guest cart after login
export const mergeCart = async (req, res) => {
  const { guestItems } = req.body;

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: guestItems.map((id) => ({ course: id })),
    });
  } else {
    guestItems.forEach((courseId) => {
      const exists = cart.items.find(
        (item) => item.course.toString() === courseId
      );

      if (!exists) {
        cart.items.push({ course: courseId });
      }
    });
  }

  await cart.save();

  await cart.populate("items.course");
  res.json({ items: cart.items });
};
