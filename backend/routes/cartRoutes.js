import express from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  mergeCart,
} from "../controllers/cartController.js";
import { authProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(authProtect, getCart)
  .post(authProtect, addToCart);

router.post("/merge", authProtect, mergeCart);
router.delete("/:courseId", authProtect, removeFromCart);

export default router;
