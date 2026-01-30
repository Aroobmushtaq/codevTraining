import React, { useState, useEffect } from 'react';
import {Stars,LogOut } from 'lucide-react';

function Navbar() {
  const [name, setName] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setName(decodedToken.name);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, [token]);

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full bg-white  px-6 py-3 flex items-center justify-between z-50">
      <div>
      <div className="flex items-center gap-2">
        <h1 className="text-xl font-bold text-pink-600">Todos</h1>
        <Stars className="text-pink-800" size={20} fill="pink" />
      </div>
        {name && <span className="text-sm text-gray-600 ">Hello, {name}!</span>}
      </div>
      <button
        onClick={logout}
        className="px-4 py-1.5 rounded-full text-sm font-medium transition bg-pink-50 p-2 hover:bg-pink-100 flex items-center border border-pink-500">
        <LogOut size={16} className="inline-block mr-1" />
        Logout
      </button>
    </nav>
  );
}

export default Navbar;
