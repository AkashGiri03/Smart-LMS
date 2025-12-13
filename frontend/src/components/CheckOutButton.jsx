import axios from "axios";
import loadRazorpay from "../utils/loadRazorpay";

export default function CheckoutButton({ course }) {
  const handleBuy = async () => {
    const token = localStorage.getItem("token");

    // 🚫 NOT LOGGED IN
    if (!token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      window.location.href = "/login";
      return;
    }

    // ✅ LOGGED IN → continue
    const ok = await loadRazorpay();
    if (!ok) {
      alert("Failed to load Razorpay");
      return;
    }

    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/payment/create-order`,
      { amount: course.price },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          alert("Payment Successful");
        }
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
