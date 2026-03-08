import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UtensilsCrossed } from "lucide-react"
function Navbar() {
    const { token, user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-white shadow-2xl text-black p-2 flex justify-between items-center">

            <div className='flex justify-center'>
                <UtensilsCrossed size={25} className="text-[#EF6E2F] mr-1" />
                <Link to="/customer" className='font-medium font-serif text-xl'>Feast <span className='text-[#EF6E2F]'>Flow</span></Link>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/customer">Home</Link>
                <Link to="/customer/menu">Menu</Link>
                {token ? (
                    <Link to="/customer/orders">Orders</Link>
                ) : null}
                {token ? (
                    <Link to="/customer/reservations">Reservations</Link>
                ) : null}
                {token ? (
                    <Link to="/customer/reviews">Reviews</Link>
                ) : null}
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