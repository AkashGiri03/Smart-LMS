import { razorpay } from "../config/razorpay.js";
import crypto from "crypto";
import User from "../models/UserModel.js";
import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import CourseProgress from "../models/CourseProgress.js";

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
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      metadata,
    } = req.body;

    // 🔐 STEP 2A: Verify signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generated_signature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid signature" });
    }

    // ✅ PAYMENT IS VERIFIED AT THIS POINT

    const userId = req.user._id;

    const courseIds = metadata?.courseIds;
    const amount = metadata?.amount;

    if (!Array.isArray(courseIds) || courseIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No courses provided for enrollment",
      });
    }

    // 🎓 STEP 2B: Enroll user (safe & idempotent)
    await User.findByIdAndUpdate(req.user._id, {
      $addToSet: {
        enrolledCourses: { $each: courseIds },
      },
    });

    for (const courseId of courseIds) {
      const exists = await CourseProgress.findOne({
        user: req.user._id,
        course: courseId,
      });

      if (!exists) {
        await CourseProgress.create({
          user: req.user._id,
          course: courseId,
          completedLessons: [],
          progressPercent: 0,
          completed: false,
          lastLesson: {
            moduleIndex: 0,
            lessonIndex: 0,
          },
        });
      }
    }

    const updatedUser = await User.findById(req.user._id);
    console.log("User enrolledCourses:", updatedUser.enrolledCourses);

    // 🧾 STEP 2C: Save order (VERY IMPORTANT)
    await Order.create({
      user: userId,
      totalAmount: amount,
      paymentStatus: "PAID",
      items: courseIds.map((id) => ({ course: id })), // 🔥 IMPORTANT
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
    });

    console.log("✅ Payment verified & order saved for user:", userId);

    // 🧹 Clear user's cart
    await Cart.updateOne({ user: req.user._id }, { $set: { items: [] } });

    // ✅ STEP 2D: Tell frontend what to do next
    return res.status(200).json({
      success: true,
      redirectTo: "/dashboard",
    });
  } catch (err) {
    console.error("verifyPayment error:", err);
    return res.status(500).json({
      success: false,
      message: "Payment verification failed",
    });
  }
};
