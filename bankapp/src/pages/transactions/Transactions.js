// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { auth, db } from '../../firebase/config';
// import { doc, getDocs, collection, where, query } from 'firebase/firestore';
// import { useState, useEffect } from 'react';
// function Account() {
// const [accounts, setAccounts] = useState([]);
//   const [user, setUser] = useState(null); // add state for user
//  const navigate = useNavigate();
//   // Wait for user session
//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//       setUser(currentUser); // automatically set user after refresh
//     });
//     return () => unsubscribe();
//   }, []);

//   const fetchAccounts = async () => {
//     if (!user) {
//       console.log("No user is currently logged in.");
//       return;
//     }
//     const userId = user.uid; // use user from state
//     try {
//       const accountsRef = collection(db, 'accounts'); 
//       const q = query(accountsRef, where('userId', '==', userId));
//       const querySnapshot = await getDocs(q);

//       // fix registeredAt
//       const accountsData = querySnapshot.docs.map(doc => {
//         const data = doc.data();
//         return { 
//           id: doc.id, 
//           ...data, 
//           registeredAt: data.registeredAt ? data.registeredAt.toDate() : null 
//         };
//       });

//       setAccounts(accountsData);
//     } catch (error) {
//       console.error("Error fetching accounts: ", error);
//     }
//   };

//   // Fetch accounts **after user is available**
//   useEffect(() => {
//     fetchAccounts();
//   }, [user]);

//   return (
//     <div>
//       <h1>Trnsaction Page</h1>
//       <table border="1" cellPadding="5" cellSpacing="0">
//         <thead>
//           <tr>
//             <th>Trnsaction Id</th>
//             <th>Time</th>
//             <th>Account #</th>
//             <th>Type</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {accounts.map((account) => (
//             <tr key={account.id}>
//               <td>{account.id}</td>
//               <td>{account.registeredAt?.toLocaleString()}</td> {/* use registeredAt */}
//               <td>{account.accountNumber}</td>
//               <td>{account.accountType}</td>
//               <td>{account.balance}</td>  
//             </tr>
//           ))}
//         </tbody>  
//       </table>
//     </div>
//   );
// }

// export default Account;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config';
import { collection, query, where, getDocs } from 'firebase/firestore';

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  // Fetch transactions
  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const transactionsRef = collection(db, 'accounts'); // assuming transactions stored in accounts for now
      const q = query(transactionsRef, where('userId', '==', user.uid));
      const querySnapshot = await getDocs(q);

      const transactionsData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          registeredAt: data.registeredAt ? data.registeredAt.toDate() : null
        };
      });

      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  if (!user) {
    return (
      <h1 className="text-center mt-20 text-xl font-semibold">
        Please log in to view your transactions.
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
        </div>

        {/* Header */}
        <h1 className='text-4xl text-center font-bold mb-6'>Transactions</h1>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Transaction ID</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Time</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Account #</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((txn) => (
                  <tr key={txn.id} className="hover:bg-gray-100">
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.id}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.registeredAt?.toLocaleString()}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.accountNumber}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.accountType}</td>
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.balance}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    No transactions found.
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

export default Transactions;
