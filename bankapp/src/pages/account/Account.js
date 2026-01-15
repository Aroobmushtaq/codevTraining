import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Account() {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/createAccount'); 
  };

  const home = () => {
    navigate('/');
  };

  // Listen for auth state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch accounts
  const fetchAccounts = async () => {
    if (!user) return;

    try {
      const accountsRef = collection(db, 'accounts'); 
      const q = query(accountsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const accountsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return { 
          id: doc.id, 
          ...data, 
          registeredAt: data.registeredAt ? data.registeredAt.toDate() : null 
        };
      });

      setAccounts(accountsData);
    } catch (error) {
      console.error("Error fetching accounts: ", error);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [user]);

  if (!user) {
    return (
      <h1 className="text-center mt-20 text-xl font-semibold">
        Please log in to view your accounts.
      </h1>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      {/* Card Container */}
      <div className="bg-white shadow-2xl rounded-2xl p-6">

        {/* Buttons in same line */}
        <div className="flex justify-between mb-6">
          <button
            onClick={home}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            Back to Dashboard
          </button>
          <button
            onClick={handleCreateAccount}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
          >
            Create Account
          </button>
        </div>

        {/* Header */}
        <h1 className='text-4xl text-center font-bold mb-6'>Accounts</h1>

        {/* Accounts Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Branch Code</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Account #</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Registered</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Balance</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((account) => (
                  <tr key={account.id} className="hover:bg-gray-100">
                    <td className="px-6 py-3 border-l border-white  bg-blue-50">{account.branchCode}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{account.accountNumber}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{account.fullName}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{account.registeredAt?.toLocaleString()}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{account.accountType}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{account.balance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                    No accounts created yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Account;
