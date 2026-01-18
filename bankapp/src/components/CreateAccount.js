import React, { useState } from 'react';
// import { db, auth } from '../firebase/config';
// import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { UserIcon, IdentificationIcon, BanknotesIcon, KeyIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
function CreateAccount() {
  const [form, setForm] = useState({
    fullName: "",
    cnic: "",
    branchCode: "",
    accountNumber: "",
    accountType: "savings",
    balance: "",
  });

  // const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dashboard = () => {
    navigate('/');
  }
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((currentUser) => {
  //     setUser(currentUser);
  //   });
  //   return () => unsubscribe();
  // }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // if (!user) {
    //   toast.error("You must be logged in to create an account!");
    //   return;
    // }

    // Validation
    if (!form.fullName || !form.cnic || !form.branchCode || !form.accountNumber || !form.accountType || !form.balance) {
      toast.error("All fields are required");
      return;
    }

    const branchCodeNum = Number(form.branchCode);
    const balanceNum = Number(form.balance);

    if (branchCodeNum < 1 || branchCodeNum > 99) {
      toast.error("Branch code must be 1-99");
      return;
    }

    if (form.accountNumber.length !== 9) {
      toast.error("Account number must be 9 digits");
      return;
    }

    if (form.cnic.length !== 13) {
      toast.error("CNIC must be 13 digits");
      return;
    }

    if (balanceNum < 500) {
      toast.error("Minimum cash deposit is 500");
      return;
    }

    try {
      // await addDoc(collection(db, "accounts"), {
      //   userId: user.uid,
      //   fullName: form.fullName,
      //   cnic: form.cnic,
      //   branchCode: branchCodeNum,
      //   accountNumber: form.accountNumber,
      //   accountType: form.accountType,
      //   balance: balanceNum,
      //   registeredAt: serverTimestamp(),
      // });
      const existingAccounts =
        JSON.parse(localStorage.getItem("accounts")) || [];
      const newAccount = {
        id: Date.now(),
        fullName: form.fullName,
        cnic: form.cnic,
        branchCode: branchCodeNum,
        accountNumber: form.accountNumber,
        accountType: form.accountType,
        balance: balanceNum,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "accounts",
        JSON.stringify([...existingAccounts, newAccount])
      );

      console.log("Account created successfully!");
      setForm({
        fullName: "",
        cnic: "",
        branchCode: "",
        accountNumber: "",
        accountType: "savings",
        balance: "",
      });
      navigate('/account');

    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Error creating account: " + error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-20 px-4">


      <form onSubmit={(e) => e.preventDefault()} className="space-y-6 bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">Enter Account Details Below</h1>
        <p className="text-center text-red-500 mb-6">All fields are required *</p>
        {/* Full Name + CNIC */}
        <div className="flex gap-4">
          {/* Full Name */}
          <div className="flex-1 flex items-center border-b-2 border-gray-300 py-2">
            <UserIcon className="h-6 w-6 text-gray-400 mr-2" />
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-gray-400"
            />
          </div>

          {/* CNIC */}
          <div className="flex-1 flex items-center border-b-2 border-gray-300 py-2">
            <IdentificationIcon className="h-6 w-6 text-gray-400 mr-2" />
            <input
              type="text"
              name="cnic"
              placeholder="CNIC (13 digits)"
              value={form.cnic}
              onChange={handleChange}
              maxLength={13}
              className="w-full bg-transparent outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* Branch Code + Account Number */}
        <div className="flex gap-4">
          {/* Branch Code */}
          <div className="flex-1 flex items-center border-b-2 border-gray-300 py-2">
            <BanknotesIcon className="h-6 w-6 text-gray-400 mr-2" />
            <input
              type="text"
              name="branchCode"
              placeholder="Branch Code (1-99)"
              value={form.branchCode}
              onChange={handleChange}
              maxLength={2}
              className="w-full bg-transparent outline-none placeholder-gray-400"
            />
          </div>

          {/* Account Number */}
          <div className="flex-1 flex items-center border-b-2 border-gray-300 py-2">
            <KeyIcon className="h-6 w-6 text-gray-400 mr-2" />
            <input
              type="text"
              name="accountNumber"
              placeholder="Account Number (9 digits)"
              value={form.accountNumber}
              onChange={handleChange}
              maxLength={9}
              className="w-full bg-transparent outline-none placeholder-gray-400"
            />
          </div>
        </div>

        {/* Account Type + Cash Deposit */}
        <div className="flex gap-4">
          {/* Account Type */}
          <div className="flex-1 flex items-center border-b-2 border-gray-300 py-2">
            <BanknotesIcon className="h-6 w-6 text-gray-400 mr-2" />
            <select
              name="accountType"
              value={form.accountType}
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-gray-400"
            >
              <option value="savings">Savings</option>
              <option value="current">Current</option>
            </select>
          </div>

          {/* Cash Deposit */}
          <div className="flex-1 flex items-center border-b-2 border-gray-300 py-2">
            <CurrencyDollarIcon className="h-6 w-6 text-gray-400 mr-2" />
            <input
              type="text"
              name="balance"
              placeholder="Cash Deposit (Min 500)"
              value={form.balance}
              onChange={handleChange}
              className="w-full bg-transparent outline-none placeholder-gray-400"
            />
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="w-40 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-500 transition font-semibold"
          >
           Create Account
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
