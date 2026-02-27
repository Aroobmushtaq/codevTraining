import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
    const { token, user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-2xl text-black p-3 flex justify-between items-center">

            {/* LEFT SIDE */}
            <div>
                {user?.role === "admin" ? (
                    <Link to="/admin">Dashboard</Link>
                ) : (
                    <Link to="/customer">Customer Dashboard</Link>
                )}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex items-center gap-4">
                {token ? (
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </div>

        </nav>
    )
}

export default Navbar