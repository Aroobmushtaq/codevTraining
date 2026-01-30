import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlusIcon, UserIcon, ArrowsRightLeftIcon, EyeIcon } from '@heroicons/react/24/outline';

function Home() {
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [totalDebits, setTotalDebits] = useState(0);

  useEffect(() => {
    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
    setAccounts(storedAccounts.length);
  }, []);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions.length);
  }, []);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions.length);

    let credits = 0;
    let debits = 0;

    storedTransactions.forEach(txn => {
      if (txn.transactionType === 'Credit') {
        credits += Number(txn.amount);
      } else if (txn.transactionType === 'Debit') {
        debits += Number(txn.amount);
      }
    });

    setTotalCredits(credits);
    setTotalDebits(debits);
  }, []);

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">

        {/* Account Section */}
        <div className="px-4 sm:px-10 py-4 sm:py-6 border rounded-2xl shadow-2xl cursor-pointer text-center bg-white">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <UserIcon className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
              <h2 className="text-xl sm:text-2xl font-bold">Accounts</h2>
            </div>
            <hr className="border-gray-300 w-full mt-2" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
            <button className="px-3 py-1 sm:px-4 sm:py-1 bg-blue-900 text-white rounded-xl hover:bg-blue-600 flex items-center justify-center space-x-1 sm:space-x-2" onClick={() => navigate('/createAccount')} >
              <UserPlusIcon className="h-5 w-5" />
                <span className="block sm:inline">Create</span>
                <span className="block sm:inline sm:ml-1">Account</span>
            </button>
            <button
              className="px-3 py-1 sm:px-4 sm:py-1 bg-blue-500 text-white rounded-xl hover:bg-blue-600 flex items-center justify-center space-x-1 sm:space-x-2"
              onClick={() => navigate('/account')}
            >
              <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="block sm:inline">View</span>
              <span className="block sm:inline sm:ml-1">Accounts</span>
            </button>
          </div>

          <hr className="border-gray-300" />
          <h1 className="mb-2 text-lg sm:text-xl font-semibold">{accounts}</h1>
          <h1 className="mb-2 text-xl sm:text-2xl font-semibold">Accounts</h1>
        </div>

        {/* Transactions Section */}
        <div className="px-4 sm:px-10 py-4 sm:py-6 border rounded-2xl shadow-2xl cursor-pointer text-center bg-white">
          <div className="flex flex-col items-center mb-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <ArrowsRightLeftIcon className="h-8 w-8 sm:h-10 sm:w-10 text-black" />
              <h2 className="text-xl sm:text-2xl font-bold">Transactions</h2>
            </div>
            <hr className="border-gray-300 w-full mt-2" />
          </div>

          {/* Button */}
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4">
            <button
              onClick={() => navigate('/transactions')}
              className="px-3 py-1 sm:px-4 sm:py-1 bg-green-500 text-white rounded-xl hover:bg-green-600 flex items-center justify-center space-x-1 sm:space-x-2"
            >
              <EyeIcon className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="block sm:inline">View</span>
              <span className="block sm:inline sm:ml-1">Transactions</span>
            </button>
          </div>

          <hr className="border-gray-300" />
          <h1 className="mb-2 text-lg sm:text-xl font-semibold">{transactions}</h1>
          <h1 className="mb-2 text-xl sm:text-2xl font-semibold">Transactions</h1>

          {/* Total Credits & Debits */}
          <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
            <p className="bg-gray-300 rounded-lg text-white text-[8px] sm:text-[10px] px-2 ">
              Total Credits Rs: <span className="text-green-900">{totalCredits}</span>
            </p>

            <p className="bg-gray-300 rounded-lg text-white text-[8px] sm:text-[10px] px-2 ">
              Total Debits Rs: <span className="text-red-900">{totalDebits}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
