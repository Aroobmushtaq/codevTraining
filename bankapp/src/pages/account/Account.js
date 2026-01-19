import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Account() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [depositModal, setDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [depositDescription, setDepositDescription] = useState('');
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawDescription, setWithdrawDescription] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [accounts, setAccounts] = useState(() => JSON.parse(localStorage.getItem("accounts")) || []);
  const navigate = useNavigate();

  const handleCreateAccount = () => navigate('/createAccount');
  const home = () => navigate('/');
// Save a transaction in localStorage
const saveTransaction = (txn) => {
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  localStorage.setItem("transactions", JSON.stringify([...transactions, txn]));
};

  // Delete account
  const handleDeleteAccount = (id) => {
    const updatedAccounts = accounts.filter(acc => acc.id !== id);
    setAccounts(updatedAccounts);
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts));
    setOpenModal(false);
  };

  
const handleDeposit = () => {
  if (!depositAmount || Number(depositAmount) <= 0) return alert("Enter a valid amount");

  const updatedAccounts = accounts.map(acc => {
    if (acc.id === selectedAccount.id) {
      const updatedAccount = {
        ...acc,
        balance: Number(acc.balance) + Number(depositAmount),
        lastDepositDescription: depositDescription
      };
      setSelectedAccount(updatedAccount);

      // Save transaction here
      saveTransaction({
        id: Date.now(),
        accountNumber: acc.accountNumber,
        accountHolderName: acc.fullName,
        transactionType: "Credit",
        amount: Number(depositAmount),
        description: depositDescription || "Deposit",
        createdAt: new Date().toISOString()
      });

      return updatedAccount;
    }
    return acc;
  });

  setAccounts(updatedAccounts);
  localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

  setDepositModal(false);
  setDepositAmount('');
  setDepositDescription('');
};


  // Withdraw function
  const handleWithdraw = () => {
  if (!withdrawAmount || Number(withdrawAmount) <= 0) return alert("Enter a valid amount");
  if (Number(withdrawAmount) > selectedAccount.balance) return alert("Insufficient balance");

  const updatedAccounts = accounts.map(acc => {
    if (acc.id === selectedAccount.id) {
      const updatedAccount = {
        ...acc,
        balance: Number(acc.balance) - Number(withdrawAmount),
        lastWithdrawDescription: withdrawDescription
      };
      setSelectedAccount(updatedAccount);

      // Save transaction here
      saveTransaction({
        id: Date.now(),
        accountNumber: acc.accountNumber,
        accountHolderName: acc.fullName,
        transactionType: "Debit",
        amount: Number(withdrawAmount),
        description: withdrawDescription || "Withdraw",
        createdAt: new Date().toISOString()
      });

      return updatedAccount;
    }
    return acc;
  });

  setAccounts(updatedAccounts);
  localStorage.setItem("accounts", JSON.stringify(updatedAccounts));

  setWithdrawModal(false);
  setWithdrawAmount('');
  setWithdrawDescription('');
};


  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto space-y-6">

      {/* Top Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <button onClick={home} className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition">
          Back to Dashboard
        </button>
        <button onClick={handleCreateAccount} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
          Create Account
        </button>
      </div>

      {/* Header */}
      <h1 className='text-4xl text-center font-bold mb-6'>Accounts</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-max border border-gray-300 table-auto">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold">Branch Code</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Account #</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Registered</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Type</th>
              <th className="px-4 py-2 text-left text-sm font-semibold">Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.length > 0 ? (
              accounts.map(account => (
                <tr key={account.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 bg-blue-50">{account.branchCode}</td>
                  <td
                    className="px-4 py-2 bg-blue-50 text-blue-600 cursor-pointer"
                    onClick={() => { setSelectedAccount(account); setOpenModal(true); }}
                  >
                    {account.accountNumber}
                  </td>
                  <td className="px-4 py-2 bg-blue-50">{account.fullName}</td>
                  <td className="px-4 py-2 bg-blue-50">{new Date(account.createdAt).toLocaleDateString("en-US")}</td>
                  <td className="px-4 py-2 bg-blue-50">{account.accountType}</td>
                  <td className="px-4 py-2 bg-blue-50">{account.balance}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-4 text-center text-gray-500">
                  No accounts created yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {accounts.length > 0 ? (
          accounts.map(account => (
            <div key={account.id} className="border rounded-xl shadow-lg p-4 bg-white space-y-2">
              <p><span className="font-semibold">Branch Code:</span> {account.branchCode}</p>
              <p>
                <span className="font-semibold">Account #:</span>
                <span className="text-blue-600 cursor-pointer ml-1" onClick={() => { setSelectedAccount(account); setOpenModal(true); }}>
                  {account.accountNumber}
                </span>
              </p>
              <p><span className="font-semibold">Name:</span> {account.fullName}</p>
              <p><span className="font-semibold">Registered:</span> {new Date(account.createdAt).toLocaleDateString("en-US")}</p>
              <p><span className="font-semibold">Type:</span> {account.accountType}</p>
              <p><span className="font-semibold">Balance:</span> {account.balance}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No accounts created yet.</p>
        )}
      </div>

      {/* Account Details Modal */}
      {openModal && selectedAccount && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 w-[90%] max-w-xl shadow-xl rounded-xl">
            <button
              onClick={() => setOpenModal(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 mb-4"
            >
              View All Accounts
            </button>

            <div className='flex justify-between items-center'>
              <h2 className="text-2xl font-bold mb-4">Account Details</h2>
              <button
                onClick={() => setConfirmDelete(true)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
              >
                Delete Account
              </button>
            </div>

            <div className="grid grid-cols-2 gap-y-2 mb-6">
              <strong>Branch Code:</strong><span>{selectedAccount.branchCode}</span>
              <strong>Account #:</strong><span>{selectedAccount.accountNumber}</span>
              <strong>Full Name:</strong><span>{selectedAccount.fullName}</span>
              <strong>Registered:</strong><span>{new Date(selectedAccount.createdAt).toLocaleDateString("en-US")}</span>
              <strong>Type:</strong><span>{selectedAccount.accountType}</span>
              <strong>Balance:</strong><span>{selectedAccount.balance}</span>
              {selectedAccount.lastDepositDescription && <>
                <strong>Last Deposit:</strong><span>{selectedAccount.lastDepositDescription}</span>
              </>}
              {selectedAccount.lastWithdrawDescription && <>
                <strong>Last Withdraw:</strong><span>{selectedAccount.lastWithdrawDescription}</span>
              </>}
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setDepositModal(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                Deposit
              </button>
              <button onClick={() => setWithdrawModal(true)} className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500">
                Withdraw
              </button>
            </div>
          </div>

          {/* Delete Confirmation Modal */}
          {confirmDelete && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-60">
              <div className="bg-white p-6 w-[90%] max-w-sm shadow-xl text-center rounded-xl">
                <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
                <p className="mb-6">Do you really want to delete this account?</p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => { handleDeleteAccount(selectedAccount.id); setConfirmDelete(false); }}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Deposit Modal */}
          {depositModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-70">
              <div className="bg-white p-6 w-[90%] max-w-sm shadow-xl rounded-xl">
                <button
                  onClick={() => { setDepositModal(false); setDepositAmount(''); setDepositDescription(''); }}
                  className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-400 mb-4"
                >
                  Back
                </button>
                <h3 className="text-xl font-bold mb-4">Deposit Amount</h3>
                <input
                  type="number"
                  min="0"
                  placeholder="Enter amount"
                  value={depositAmount}
                  className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none mb-4 px-1 py-1"
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
                <textarea
                  placeholder="Enter description"
                  value={depositDescription}
                  onChange={(e) => setDepositDescription(e.target.value)}
                  className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none mb-4 px-1 py-1"
                />
                <div className="flex justify-end gap-4">
                  <button onClick={handleDeposit} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500">
                    Deposit
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Withdraw Modal */}
          {withdrawModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-70">
              <div className="bg-white p-6 w-[90%] max-w-sm shadow-xl rounded-xl">
                <button
                  onClick={() => { setWithdrawModal(false); setWithdrawAmount(''); setWithdrawDescription(''); }}
                  className="px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-blue-400 mb-4"
                >
                  Back
                </button>
                <h3 className="text-xl font-bold mb-4">Withdraw Amount</h3>
                <input
                  type="number"
                  min="0"
                  placeholder={`Amount to Withdraw, Max: ${selectedAccount.balance}`}
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none mb-4 px-1 py-1"
                />
                <textarea
                  placeholder="Enter description"
                  value={withdrawDescription}
                  onChange={(e) => setWithdrawDescription(e.target.value)}
                  className="w-full border-b-2 border-gray-400 focus:border-blue-600 focus:outline-none mb-4 px-1 py-1"
                />
                <div className="flex justify-end gap-4">
                  <button onClick={handleWithdraw} className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500">
                    Withdraw
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default Account;
