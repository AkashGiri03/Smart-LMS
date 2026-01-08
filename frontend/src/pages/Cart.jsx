import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import CheckoutButton from "../components/CheckOutButton";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h3>Your cart is empty</h3>
        <Link to="/" className="btn btn-primary mt-3">
          Browse Courses
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce(
    (sum, item) => sum + (item.course?.price || item.price),
    0
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4 fw-bold">Your Cart</h2>

      <div className="row">
        {/* LEFT: Cart Items */}
        <div className="col-md-8">
          {cartItems.map((item) => {
            const course = item.course || item;

            return (
              <div
                key={course._id}
                className="card mb-3 shadow-sm"
                style={{ borderRadius: "10px" }}
              >
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title mb-1">{course.title}</h5>
                    <p className="text-muted mb-0">₹{course.price}</p>
                  </div>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => removeFromCart(course._id.toString())}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Summary */}
        <div className="col-md-4">
          <div className="card shadow-sm" style={{ borderRadius: "10px" }}>
            <div className="card-body">
              <h5 className="fw-bold">Order Summary</h5>
              <hr />

              <div className="d-flex justify-content-between mb-2">
                <span>Total Courses</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="d-flex justify-content-between mb-3">
                <span>Total Price</span>
                <span className="fw-bold">₹{total}</span>
              </div>

              <CheckoutButton cartItems={cartItems} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
