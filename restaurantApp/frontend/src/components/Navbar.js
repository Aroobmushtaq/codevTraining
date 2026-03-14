import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UtensilsCrossed, ShoppingCart } from "lucide-react"
import { CartContext } from '../pages/customer/context/CartContext';
function Navbar() {
    const { token, user, logout } = useContext(AuthContext);
    const { cartItems } = useContext(CartContext);
    return (
        <nav className="sticky top-0 z-50 bg-white shadow-2xl text-black p-2 flex justify-between items-center">

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
                    <Link to="/customer/cart">
                        <div className="relative">
                            <ShoppingCart size={24} />

                            <span className="absolute -top-2 -right-2 bg-[#EF6E2F] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                {cartItems.length}
                            </span>
                        </div>
                    </Link>
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