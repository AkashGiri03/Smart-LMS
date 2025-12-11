import express from "express";
import bodyParser from "body-parser";
import crypto from "crypto";

const router = express.Router();

// use raw body — important
router.post(
  "/razorpay",
  bodyParser.raw({ type: "application/json" }),
  (req, res) => {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET || "";
    const signature = req.headers["x-razorpay-signature"];
    const hash = crypto.createHmac("sha256", secret).update(req.body).digest("hex");

    if (hash === signature) {
      const event = JSON.parse(req.body.toString());
      // handle event.event (payment.captured, payment.failed, order.paid, etc.)
      console.log("Verified webhook:", event.event);
      // update DB accordingly
      res.json({ received: true });
    } else {
      console.warn("Webhook signature mismatch");
      res.status(400).send("invalid signature");
    }
  }
);

export default router;
