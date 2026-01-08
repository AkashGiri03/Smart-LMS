export const mergeCartAfterLogin = async (token, setCartItems) => {
  const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
  if (guestCart.length === 0) return;

  const guestIds = guestCart.map((c) => c._id);

  const res = await fetch("/api/cart/merge", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ guestItems: guestIds }),
  });

  const data = await res.json();
  setCartItems(data.items);
  localStorage.removeItem("cart");
};
