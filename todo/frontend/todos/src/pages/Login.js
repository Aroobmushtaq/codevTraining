import axios from 'axios';
import React from 'react'
import todoImage from '../assets/images/df72dca3-882b-48b4-aa4a-0996756b9dd9_removalai_preview.png';
import { useState } from 'react';
import { Mail, Lock, LogIn, SmileIcon} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      Toast.error("Please fill all fields");
      return;
    }

    axios.post('http://localhost:3000/auth/login', { email, password })
      .then(response => {
        console.log('Login successful:', response.data);
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      })
      .catch(error => {
        console.error('There was an error logging in!', error);
        const errorMessage = error.response && error.response.data && error.response.data.error 
          ? error.response.data.error
          : 'Login failed';
        Toast.error(errorMessage);
      });
  }
  return (
    <div className='bg-gradient-to-r from-[#f5dbe6] to-[#e5dcef] min-h-screen flex items-center justify-center p-4'>
                <div className="bg-white rounded-xl shadow-lg px-10 py-8 transform transition-transform w-full max-w-md">
                    <img src={todoImage} alt="Register" className="w-36 mb-2 mx-auto animate-float" />
                    <h1 className="  text-2xl font-bold text-center flex items-center justify-center gap-2">Welcome Back<SmileIcon className="text-pink-800" size={24} fill="pink" /></h1>
                    <p className="text-center text-gray-600 text-36">Sign in to continue your productivity journey</p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                        <label className='font-semibold text-sm'>Email</label>
                        <div className="relative w-full">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="email"
                                placeholder="hello@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-pink-50 w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition"
                            />
                        </div>
                        <label className='font-semibold text-sm'>Password</label>
                        <div className="relative w-full">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="password"
                                placeholder=".........."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-pink-50 w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200 transition"
                            />
                        </div>
                        <button
                            type="submit"
                            className="mt-4 flex items-center justify-center gap-2 
               bg-gradient-to-r from-[#f5a3c7] to-[#f8d1e3] 
               p-2 rounded-3xl 
               hover:from-[#f8d1e3] hover:to-[#f5a3c7] 
               transition"
    
                        >
                            <LogIn size={20} className="text-gray-700" />
                            Sign In
                        </button>
    
                        <p className="text-center text-sm text-gray-600">Don't have an account? <a href="/" className='text-pink-500'>Sign up</a></p>
                    </form>
                </div>
            </div>
        )
  
}

export default Login
