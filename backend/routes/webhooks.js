import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const router = express.Router();

// use raw body — important
router.post(
  "/razorpay",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    if (!req.body) {
      return res.status(400).send("No raw body received");
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
    const signature = req.headers["x-razorpay-signature"];

    const body = req.body.toString("utf8");

    const hash = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (hash === signature) {
      const event = JSON.parse(body);
      console.log("Verified webhook:", event.event);
      return res.json({ received: true });
    }

    console.warn("Webhook signature mismatch");
    return res.status(400).send("invalid signature");
  }
);


export default router;
