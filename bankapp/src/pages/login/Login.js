import React from 'react'
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {auth} from '../../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
export default function Login() {
   const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    async function handlesubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            toast.error("Please fill all the fields");
            return;
        }
        if (password.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("User logged in:", userCredential.user);
            console.log("User logged in successfully!");
            navigate('/');
        }
        catch (error) {
            alert("Error logging in user:", error.message);
        }
        setEmail("");
        setPassword("");
    }
  return (
    <div className="min-h-screen bg-blue-400 flex items-center justify-center px-6 py-12">
      
      {/* White form container */}
      <div className="w-full max-w-sm bg-white px-6 py-6 rounded-lg shadow-lg space-y-6">

        <h2 className="text-center text-2xl font-bold text-black">
          Login
        </h2>

        <form onSubmit={handlesubmit}>
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

        {/* Login button */}
        <button type='submit' className="mx-auto block mt-6 rounded-md bg-green-600 px-8 py-2 font-semibold text-white hover:bg-green-400">
          Login
        </button>
</form>
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/signup" className='text-blue-700 underline'>Sign up</Link>
        </p>

      </div>
    </div>
  );
}
