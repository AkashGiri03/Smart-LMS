import axios from "axios";
import loadRazorpay from "../utils/loadRazorpay";

export default function CheckoutButton({ course }) {
  const handleBuy = async () => {
    const ok = await loadRazorpay();
    if (!ok) return alert("Failed to load Razorpay");

    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/payment/create-order`,
      { amount: course.price }
    );

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Your App",
      description: course.title,
      order_id: order.id,
      handler: async (response) => {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/payment/verify-payment`,
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            metadata: { courseId: course._id },
          }
        );

        if (res.data.success) alert("Payment Successful");
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <button className="btn btn-primary mt-3" onClick={handleBuy}>
      Buy Now — ₹{course.price}
    </button>
  );
}
