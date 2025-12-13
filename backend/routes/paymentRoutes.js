import express from "express";
import { createOrder, verifyPayment } from "../controllers/paymentController.js";
import { authProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/create-order", authProtect, createOrder);
router.post("/verify-payment", authProtect, verifyPayment);

export default router;
