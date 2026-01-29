import axios from "axios";
import loadRazorpay from "../utils/loadRazorpay";
import { useNavigate } from "react-router-dom";

export default function CheckoutButton({ course, cartItems, total }) {
  const navigate = useNavigate();
  const handleBuy = async () => {
    const token = localStorage.getItem("token");

    // 🚫 NOT LOGGED IN
    if (!token) {
      localStorage.setItem("redirectAfterLogin", window.location.pathname);
      navigate("/login");
      return;
    }

    const ok = await loadRazorpay();
    if (!ok) {
      alert("Failed to load Razorpay");
      return;
    }

    // 🔥 CART CHECKOUT
    const isCartCheckout = Array.isArray(cartItems);

    const payload = isCartCheckout
      ? {
          amount: total,
          courseIds: cartItems.map((i) => (i.course || i)._id),
        }
      : {
          amount: course.price,
          courseIds: [course._id],
        };

    const { data: order } = await axios.post(
      `${import.meta.env.VITE_API_BASE}/api/payment/create-order`,
      payload,
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
      description: "Course Purchase",
      order_id: order.id,

      handler: async (response) => {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE}/api/payment/verify-payment`,
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            metadata: payload,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("✅ Verify-payment response:", res.data);

        if (res.data.success) {
          localStorage.removeItem("cart");
          window.location.href = res.data.redirectTo;
        }
      },
    };

    new window.Razorpay(options).open();
  };

  return (
    <button className="btn btn-primary w-100 fw-bold mt-2" onClick={handleBuy}>
      Proceed to Checkout
    </button>
  );
}
