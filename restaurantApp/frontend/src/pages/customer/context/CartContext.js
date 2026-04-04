import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get("https://forked-serene-livedistro--aroobmushtaq7.replit.app/api/cards/items", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCartItems(res.data);
    } catch (error) {
      console.log("Fetch cart error:", error);
    }
  };

  const addToCart = async (item) => {
    try {
      console.log("Adding item:", item);

      const existingItem = cartItems.find(
        (cartItem) =>
          cartItem.menuItemId?._id === item._id || cartItem._id === item._id
      );

      const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

      const res = await axios.post(
        "https://forked-serene-livedistro--aroobmushtaq7.replit.app/api/cards/add",
        {
          menuItemId: item._id,
          quantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Added:", res.data);

      fetchCart();
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
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};