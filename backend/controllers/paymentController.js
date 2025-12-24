import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";

// create order (amount in INR)
export const createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR", receipt } = req.body;
    if (!amount) return res.status(400).json({ message: "amount required" });

    const options = {
      amount: Math.round(amount * 100), // paise
      currency,
      receipt: receipt || `rcpt_${Date.now()}`,
      payment_capture: 1, // auto capture
    };

    const order = await razorpay.orders.create(options);
    return res.status(200).json(order); // includes id, amount, currency
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "order creation failed" });
  }
};

// verify signature after payment (frontend sends razorpay_* params)
export const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, metadata } = req.body;
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature === razorpay_signature) {
      // Save payment to DB, update order status, enroll user, etc.
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "verification failed" });
  }
};
