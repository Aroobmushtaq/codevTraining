import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(0);

  
useEffect(() => {
  const storedAccounts =
    JSON.parse(localStorage.getItem('accounts')) || [];

  setAccounts(storedAccounts.length);
}, []);

  return (
    <div className="py-14">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        
        {/* Account Section */}
        <div className="px-10 py-6 border rounded-2xl shadow-2xl cursor-pointer text-center bg-white">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center space-x-3">
              <UserIcon className="h-10 w-10 text-black" />
              <h2 className="text-2xl font-bold">Accounts</h2>
            </div>
            <hr className="border-gray-300 w-full mt-2" style={{ maxWidth: 'calc(3rem + 0.5em + 5ch)' }} />
          </div>
          <div className="flex justify-center gap-4 mb-4">
            <button
              className="px-4 py-2 bg-blue-900 text-white rounded-xl hover:bg-blue-600"
              onClick={() => navigate('/createAccount')}
            >
              Create Account
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600"
              onClick={() => navigate('/account')}
            >
              View Accounts
            </button>
            
          </div>

          <hr className="border-gray-300" />
          <h1 className="mb-4 text-xl font-semibold">{accounts}</h1>
          <h1 className="mb-4 text-2xl font-semibold">Accounts</h1>

        </div>

        {/* Transactions Section */}
        <div className="px-10 py-6 border rounded-2xl shadow-2xl cursor-pointer text-center bg-white">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center space-x-3">
              <ArrowsRightLeftIcon className="h-10 w-10 text-black" />
              <h2 className="text-2xl font-bold">Transactions</h2>
            </div>
            <hr className="border-gray-300 w-full mt-2" style={{ maxWidth: 'calc(3rem + 0.5em + 12ch)' }} />
          </div>

          <div className="mb-4">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              onClick={() => navigate('/transactions')}
            >
              View Transactions
            </button>
          </div>

          <hr className="border-gray-300" />
          <h1 className="mb-4 text-xl font-semibold">{accounts}</h1>
          <h1 className="mb-4 text-2xl font-semibold">Transactions</h1>
        </div>

      </div>
    </div>
  );
}

export default Home;
