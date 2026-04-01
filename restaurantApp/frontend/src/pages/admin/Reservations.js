import React, { useEffect, useState } from "react";
import axios from "axios";
import Toast from "../../components/Toast";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);

  const token = localStorage.getItem("token");

  // 🎨 Status text colors (like Orders page)
  const statusColors = {
    Pending: "text-yellow-600",
    Confirmed: "text-green-600",
    Cancelled: "text-red-600",
  };

  // ✅ Fetch reservations
  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reservations/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReservations(res.data);
    } catch (error) {
      console.error(error);
      Toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  // ✅ Update status (instant UI update like Orders)
  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    try {
      await axios.put(
        `http://localhost:5000/api/reservations/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // instant UI update
      setReservations((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, status: newStatus } : r
        )
      );

      Toast.success("Status updated");
    } catch (error) {
      console.error(error);
      Toast.error("Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10">
        Loading reservations...
      </p>
    );

  if (reservations.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        No reservations found
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto mt-6 overflow-x-auto">
      
      <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
        
        {/* HEADER */}
        <thead className="text-gray-500 border-t">
          <tr>
            <th className="px-4 py-3 text-left text-sm">Customer</th>
            <th className="px-4 py-3 text-left text-sm">Date</th>
            <th className="px-4 py-3 text-left text-sm">Time</th>
            <th className="px-4 py-3 text-left text-sm">Guests</th>
            <th className="px-4 py-3 text-left text-sm">Status</th>
            <th className="px-4 py-3 text-left text-sm">Update</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {reservations.map((reservation, index) => (
            <tr
              key={reservation._id}
              className={`border-t hover:bg-gray-50 transition ${
                index % 2 === 0 ? "bg-gray-50/40" : "bg-white"
              }`}
            >
              
              {/* Customer */}
              <td className="px-3 py-2 text-sm text-gray-700">
                {reservation.user?.name || "N/A"}
              </td>

              {/* Date */}
              <td className="px-3 py-2 text-sm text-gray-600">
                {new Date(reservation.date).toLocaleDateString()}
              </td>

              {/* Time */}
              <td className="px-3 py-2 text-sm text-gray-600">
                {reservation.time}
              </td>

              {/* Guests */}
              <td className="px-3 py-2 text-sm font-medium text-gray-700">
                {reservation.guests}
              </td>

              {/* Status (colored text only) */}
              <td
                className={`px-3 py-2 text-sm font-semibold ${
                  statusColors[reservation.status]
                }`}
              >
                {reservation.status}
              </td>

              {/* Dropdown */}
              <td className="px-3 py-2 text-sm">
                <select
                  value={reservation.status}
                  onChange={(e) =>
                    updateStatus(
                      reservation._id,
                      e.target.value.trim()
                    )
                  }
                  className={`px-2 py-1 rounded text-sm font-semibold border bg-white
                    ${statusColors[reservation.status]}
                  `}
                  disabled={updatingId === reservation._id}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;