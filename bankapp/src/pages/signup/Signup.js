import React from 'react'
import { toast } from 'react-toastify';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';

export default function Signup() {
   const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate();
  async function handlesubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      console.log("User created:", user);
      console.log("User registered successfully!");
      navigate('/');
    }
    catch (error) {
      toast.error("Error creating user:" + error.message);
    }
    setName("");
    setEmail("");
    setPassword("");

  }
  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center px-6 py-12">
      
      {/* White form container */}
      <div className="w-full max-w-sm bg-white px-6 py-6 rounded-lg shadow-lg space-y-6">

        <h2 className="text-center text-2xl font-bold text-black">
          Register
        </h2>

        {/* Full Name */}
        <form onSubmit={handlesubmit}>
        <div className="relative mt-4">
          <UserIcon className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Full Name"
            value={name} onChange={(e) => { setName(e.target.value) }}
            className="w-full border-b border-gray-300 pl-7 py-1.5 text-black placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none bg-transparent"
          />
        </div>

        {/* Email */}
        <div className="relative mt-4">
          <EnvelopeIcon className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
          <input
            type="email"
            placeholder="Email"
            value={email} onChange={(e) => { setEmail(e.target.value) }}
            className="w-full border-b border-gray-300 pl-7 py-1.5 text-black placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none bg-transparent"
          />
        </div>

        {/* Password */}
        <div className="relative mt-4">
          <LockClosedIcon className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-black" />
          <input
            type="password"
            placeholder="Password"
            value={password} onChange={(e) => { setPassword(e.target.value) }}
            className="w-full border-b border-gray-300 pl-7 py-1.5 text-black placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none bg-transparent"
          />
        </div>

        {/* Register button */}
        <button type='submit' className="mx-auto block mt-6 rounded-md bg-green-600 px-8 py-2 font-semibold text-white hover:bg-green-400">
          Register
        </button>
</form>
        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className='text-blue-700 underline'>Login</Link>
        </p>

      </div>
    </div>
  );
}
