import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const BASE_API = import.meta.env.VITE_API_BASE;

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { token } = useAuth(); // 🔥 reactive token
  const [cartItems, setCartItems] = useState([]);

  // LOAD CART (guest OR logged-in)
  useEffect(() => {
    const loadCart = async () => {
      try {
        // LOGGED-IN USER
        if (token) {
          const res = await fetch(`${BASE_API}/api/cart`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            console.error("Failed to load cart", res.status);
            setCartItems([]);
            return;
          }

          const data = await res.json();
          setCartItems(data.items || []);
        }
        // GUEST USER
        else {
          const guestCart =
            JSON.parse(localStorage.getItem("cart")) || [];
          setCartItems(guestCart);
        }
      } catch (err) {
        console.error("Cart load error", err);
      }
    };

    loadCart();
  }, [token]); // 🔥 re-runs on login/logout

  // ADD TO CART
  const addToCart = async (course) => {
    if (!course || !course._id) return;

    // GUEST
    if (!token) {
      const exists = cartItems.find((i) => i._id === course._id);
      if (exists) return;

      const updated = [...cartItems, course];
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      return;
    }

    // LOGGED-IN
    try {
      const res = await fetch(`${BASE_API}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseId: course._id }),
      });

      if (!res.ok) {
        console.error("Add to cart failed", res.status);
        return;
      }

      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Add to cart error", err);
    }
  };

  // REMOVE FROM CART
  const removeFromCart = async (courseId) => {
    if (!courseId) return;

    // GUEST
    if (!token) {
      const updated = cartItems.filter(
        (i) => i._id !== courseId
      );
      setCartItems(updated);
      localStorage.setItem("cart", JSON.stringify(updated));
      return;
    }

    // LOGGED-IN
    try {
      const res = await fetch(
        `${BASE_API}/api/cart/${courseId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        console.error("Remove from cart failed", res.status);
        return;
      }

      const data = await res.json();
      setCartItems(data.items || []);
    } catch (err) {
      console.error("Remove cart error", err);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        setCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
};
