import React, { useContext } from "react";
import { CartContext } from "./context/CartContext";

function CustomerCard() {

  const { cartItems } = useContext(CartContext);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div key={item._id} className="flex gap-4 border-b py-4">

            <img
              src={item.menuItem?.imageUrl}
              alt={item.menuItem?.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div>
              <h2 className="font-semibold">
                {item.menuItem?.name}
              </h2>

              <p className="text-gray-500">
                ${item.menuItem?.price}
              </p>

              <p className="text-sm text-gray-400">
                Qty: {item.quantity}
              </p>
            </div>

          </div>
        ))
      )}

    </div>
  );
}

export default CustomerCard;