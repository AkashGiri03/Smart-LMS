const Checkout = () => {
  const token = localStorage.getItem("token");

  const checkoutHandler = async () => {
    const res = await fetch("/api/orders/checkout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    alert("Order placed successfully");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <button onClick={checkoutHandler}>Pay Now</button>
    </div>
  );
};

export default Checkout;
