// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// // import { auth, db } from '../../firebase/config';
// // import { collection, query, where, getDocs } from 'firebase/firestore';
// import { useEffect } from 'react';

// function Transactions() {
//    const [transactions, setTransactions] = useState(() => {
//     return JSON.parse(localStorage.getItem("accounts")) || [];
//   });
//   // const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   const home = () => {
//     navigate('/');
//   };

//   // Listen for auth state
//   // useEffect(() => {
//   //   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
//   //     setUser(currentUser);
//   //   });
//   //   return () => unsubscribe();
//   // }, []);

//   // Fetch transactions
//   // const fetchTransactions = async () => {
//   //   if (!user) return;

//   //   try {
//   //     const transactionsRef = collection(db, 'accounts'); // assuming transactions stored in accounts for now
//   //     const q = query(transactionsRef, where('userId', '==', user.uid));
//   //     const querySnapshot = await getDocs(q);

//   //     const transactionsData = querySnapshot.docs.map(doc => {
//   //       const data = doc.data();
//   //       return {
//   //         id: doc.id,
//   //         ...data,
//   //         registeredAt: data.registeredAt ? data.registeredAt.toDate() : null
//   //       };
//   //     });

//   //     setTransactions(transactionsData);
//   //   } catch (error) {
//   //     console.error("Error fetching transactions: ", error);
//   //   }
//   // };

//   // useEffect(() => {
//   //   fetchTransactions();
//   // }, [user]);

//   // if (!user) {
//   //   return (
//   //     <h1 className="text-center mt-20 text-xl font-semibold">
//   //       Please log in to view your transactions.
//   //     </h1>
//   //   );
//   // }


//   return (
//     <div className="pt-20 px-4 max-w-6xl mx-auto">
//       {/* Card Container */}
//       <div className="bg-white shadow-2xl rounded-2xl p-6">

//         {/* Buttons in same line */}
//         <div className="flex justify-between mb-6">
//           <button
//             onClick={home}
//             className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
//           >
//             Back to Dashboard
//           </button>
//         </div>

//         {/* Header */}
//         <h1 className='text-4xl text-center font-bold mb-6'>Transactions</h1>

//         {/* Transactions Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-300">
//             <thead className="bg-blue-500 text-white">
//               <tr>
//                 <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Transaction ID</th>
//                 <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Time</th>
//                 <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Account #</th>
//                 <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Type</th>
//                 <th className="px-6 py-3 border-l border-white text-left text-sm font-semibold">Amount</th>
//               </tr>
//             </thead>
//             <tbody>
//               {transactions.length > 0 ? (
//                 transactions.map((txn) => (
//                   <tr key={txn.id} className="hover:bg-gray-100">
//                     <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.id}</td>
//                     <td className="px-6 py-3 border-l border-white bg-blue-50">{new Date(txn.createdAt).toLocaleString()}</td>
//                     <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.accountNumber}</td>
//                     <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.accountType}</td>
//                     <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.balance}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
//                     No transactions found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Transactions;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Transactions() {
  const [transactions] = useState(() => {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  });

  const navigate = useNavigate();

  const home = () => {
    navigate('/');
  };

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      {/* Card Container */}
      <div >

        {/* Buttons */}
        <div className="flex justify-between mb-6 flex-wrap gap-2">
          <button
            onClick={home}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            Back to Dashboard
          </button>
        </div>

        {/* Header */}
        <h1 className="text-4xl text-center font-bold mb-6">Transactions</h1>

        {/* Large screen table */}
        <div className="hidden md:block overflow-x-auto">
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
                    <td className="px-6 py-3 border-l border-white bg-blue-50">{new Date(txn.createdAt).toLocaleString()}</td>
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

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {transactions.length > 0 ? (
            transactions.map((txn) => (
              <div key={txn.id} className="border rounded-2xl shadow-2xl p-4 bg-white space-y-2">
                <p><span className="font-semibold">Transaction ID:</span> {txn.id}</p>
                <p><span className="font-semibold">Time:</span> {new Date(txn.createdAt).toLocaleString()}</p>
                <p><span className="font-semibold">Account #:</span> {txn.accountNumber}</p>
                <p><span className="font-semibold">Type:</span> {txn.accountType}</p>
                <p><span className="font-semibold">Amount:</span> {txn.balance}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No transactions found.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Transactions;
