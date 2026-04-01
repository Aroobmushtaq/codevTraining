import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowsRightLeftIcon } from "@heroicons/react/24/outline";
function Transactions() {
  const [transactions] = useState(() => {
    return JSON.parse(localStorage.getItem("transactions")) || [];
  });
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [accounts] = useState(() => {
    return JSON.parse(localStorage.getItem("accounts")) || [];
  });
  const navigate = useNavigate();
  const home = () => {
    navigate("/");
  };

  return (
    <div className="pt-4 px-4 max-w-6xl mx-auto shadow-2xl mt-8">
      {/* Top Buttons */}
      <div className="flex justify-between mb-6 flex-wrap gap-2">
        <button
          onClick={home}
          className="px-2 text-[15px] bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
        >
          <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
          Back to Dashboard
        </button>
      </div>

      {/* Header */}
      <h1 className="text-2xl text-center font-bold mb-6"> <ArrowsRightLeftIcon className="h-8 w-8 inline-block " /> Transactions</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md mb-3">
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
                <tr
                  key={txn.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedTxn(txn)}
                >
                  <td className="px-6 py-3 border-l border-white bg-blue-50 text-blue-900">{txn.id}</td>
                  <td className="px-6 py-3 border-l border-white bg-blue-50">{new Date(txn.createdAt).toLocaleTimeString("en-US")}</td>
                  <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.accountNumber}</td>
                  <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.transactionType}</td>
                  <td className="px-6 py-3 border-l border-white bg-blue-50">{txn.amount}</td>
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {transactions.length > 0 ? (
          transactions.map((txn) => (
            <div
              key={txn.id}
              className=" border rounded-2xl shadow-2xl p-4 bg-white space-y-2 cursor-pointer"
              onClick={() => setSelectedTxn(txn)}
            >
              <p><span className="font-semibold" >Transaction ID:</span><span className="text-blue-900"> {txn.id}</span> </p>
              <p><span className="font-semibold">Time:</span> {new Date(txn.createdAt).toLocaleTimeString("en-US")}</p>
              <p><span className="font-semibold">Account #:</span> {txn.accountNumber}</p>
              <p><span className="font-semibold">Type:</span> {txn.transactionType}</p>
              <p><span className="font-semibold">Amount:</span> {txn.amount}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No transactions found.</p>
        )}
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 w-[90%] max-w-md shadow-xl rounded-xl space-y-3">
            <button
              onClick={() => setSelectedTxn(null)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
            >
              <ArrowLeftIcon className="h-5 w-5 inline-block mr-2" />
              View All Transactions
            </button>
            <h2 className="text-2xl font-bold mb-2">Transaction Details</h2>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
  <span className="font-semibold">Transaction ID:</span>
  <span>{selectedTxn.id}</span>

  <span className="font-semibold">Account #:</span>
  <span>{selectedTxn.accountNumber}</span>

  <span className="font-semibold">Account Holder Name:</span>
  <span>{selectedTxn.accountHolderName}</span>

  <span className="font-semibold">Transaction Date:</span>
  <span>{new Date(selectedTxn.createdAt).toLocaleDateString("en-US")}</span>

  <span className="font-semibold">Transaction Time:</span>
  <span>{new Date(selectedTxn.createdAt).toLocaleTimeString("en-US")}</span>

  <span className="font-semibold">Transaction Type:</span>
  <span>{selectedTxn.transactionType}</span>

  <span className="font-semibold">Amount:</span>
  <span>{selectedTxn.amount}</span>

  <span className="font-semibold">Description:</span>
  <span>{selectedTxn.description}</span>
</div>

          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
