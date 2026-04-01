import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="flex justify-between items-center px-5 py-3 bg-green-500 text-white">
      <h2 className="text-xl font-bold"> Todo App</h2>

      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={handleLogout}
            className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 shadow-sm font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none"
          >
            Logout
          </button>

        ) : (
          <>
            <Link
              to="/"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-sm font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 shadow-sm font-medium rounded-full text-sm px-4 py-2.5 focus:outline-none"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
