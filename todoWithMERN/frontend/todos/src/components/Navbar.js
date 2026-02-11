import React, { useState, useEffect } from 'react';
import { Stars, LogOut, LogIn, UserPlus } from 'lucide-react';

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
    window.location.reload(); // Reload page after logout
  };

  return (
    <nav className="shadow-md fixed top-0 left-0 w-full bg-white px-6 py-3 flex items-center justify-between z-50">
     <div className="flex flex-col items-start gap-1">
  <div className="flex items-center gap-2">
    <h1 className="text-xl font-bold text-pink-600">Todos</h1>
    <Stars className="text-pink-800" size={20} fill="pink" />
  </div>
  {name && <span className="text-sm text-gray-600">Hello, {name}!</span>}
</div>

      {token ? (
        // If logged in, show name and logout
        <div className="flex items-center gap-4">
          <button
            onClick={logout}
            className="px-4 py-1.5 rounded-full text-sm font-medium transition bg-pink-50 hover:bg-pink-100 flex items-center border border-pink-500"
          >
            <LogOut size={16} className="inline-block mr-1" />
            Logout
          </button>
        </div>
      ) : (
        // If not logged in, show Login / Register buttons
        <div className="flex items-center gap-2">
          <a
            href="/login"
            className="px-4 py-1.5 rounded-full text-sm font-medium transition bg-pink-50 hover:bg-pink-100 border border-pink-500"
          >
            <LogIn size={16} className="inline-block mr-1" />
            Login
          </a>
          <a
            href="/register"
            className="px-4 py-1.5 rounded-full text-sm font-medium transition bg-pink-500 text-white hover:bg-pink-600"
          >
            <UserPlus size={16} className="inline-block mr-1" />
            Register
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
