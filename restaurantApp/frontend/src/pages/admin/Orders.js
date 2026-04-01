import React, { useState, useEffect } from "react";
import axios from "axios";
import Toast from "../../components/Toast"; // same toast as Menu.js

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem("token");
  const statusOptions = ["Pending", "Preparing", "Delivered", "Cancelled"];

  // ✅ Fetch all orders
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/orders/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      if (err.response?.status === 403) {
        Toast.error("Admin access required!");
      } else {
        Toast.error("Failed to fetch orders");
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update order status
  const updateStatus = async (orderId, status) => {
    setUpdatingId(orderId);
    try {
      await axios.put(
        `http://localhost:5000/api/orders/${orderId}/status`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Instant UI update
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status } : o))
      );

      Toast.success("Status updated successfully");
    } catch (err) {
      Toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading orders...</p>;
  if (orders.length === 0) return <p className="text-center mt-10">No orders found</p>;

  return (
    <div className="overflow-x-auto max-w-7xl mx-auto ">
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        <thead className="text-gray-500 border-t">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Order ID</th>
            <th className="px-4 py-3 text-left text-sm">User</th>
            <th className="px-4 py-3 text-left text-sm">Items</th>
            <th className="px-4 py-3 text-left text-sm">Total</th>
            <th className="px-4 py-3 text-left text-sm">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-t">
              <td className="px-3 py-2 text-sm font-medium">{order._id}</td>
              <td className="px-3 py-2 text-sm">{order.user?.name || "Unknown"}</td>
              <td className="px-3 py-2 text-sm">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span>PKR {(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </td>
              <td className="px-3 py-2 text-sm font-semibold">
                PKR {order.items.reduce((sum, i) => sum + i.price * i.quantity, 0).toLocaleString()}
              </td>
              <td className="px-3 py-2 text-sm">
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value.trim())}
                  className={`px-2 py-1 rounded text-sm font-semibold border
    ${order.status === "Pending" && "text-yellow-700"}
    ${order.status === "Preparing" && "text-blue-700"}
    ${order.status === "Delivered" && "text-green-700"}
    ${order.status === "Cancelled" && "text-red-700"}
  `}
                  disabled={updatingId === order._id}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;