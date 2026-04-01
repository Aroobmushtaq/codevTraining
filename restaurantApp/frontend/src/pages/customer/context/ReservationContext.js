import { createContext, useState } from "react";
import axios from "axios";

export const ReservationContext = createContext();

export const ReservationProvider = ({ children }) => {
  const [reservations, setReservations] = useState([]);

  const token = localStorage.getItem("token");

  // ✅ CREATE
  const createReservation = async (data) => {
    try {
      await axios.post(
        "http://localhost:5000/api/reservations/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReservations(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ GET MY
  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reservations/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setReservations(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE
  const updateReservation = async (id, updatedData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/reservations/${id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchReservations();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ReservationContext.Provider
      value={{
        reservations,
        createReservation,
        fetchReservations,
        updateReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  );
};