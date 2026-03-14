import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("token");

  // FETCH CART
 const fetchCart = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(
      "http://localhost:5000/api/cards/items",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setCartItems(res.data);

  } catch (error) {
    console.log("Fetch cart error:", error);
  }
};

  // ADD TO CART
  const addToCart = async (item) => {

    try {

      console.log("Adding item:", item);

      const res = await axios.post(
        "http://localhost:5000/api/cards/add",
        {
          menuItemId: item._id,
          quantity: 1
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Added:", res.data);

      fetchCart(); // refresh cart

    } catch (error) {
      console.error("Add cart error:", error);
    }
  };

  useEffect(() => {
    if (token && userId) {
      fetchCart();
    }
  }, [token, userId]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};