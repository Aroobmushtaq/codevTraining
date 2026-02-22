import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import todoImage from '../assets/images/df72dca3-882b-48b4-aa4a-0996756b9dd9_removalai_preview.png';
import axios from 'axios';
import { Mail, Lock, User, UserPlus, Stars } from 'lucide-react';
import Toast from '../components/Toast';
function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username || !email || !password) {
            Toast.error("Please fill all fields");
            return;
        }
        if (password.length < 6) {
            Toast.error("Password must be at least 6 characters");
            return;
        }
        setLoading(true);
        axios.post('https://todo-backend--aroobmushtaq786.replit.app/auth/register', { username, email, password })
            .then(response => {
                console.log('Registration successful:', response.data);
                Toast.success("Registration successful! Please login.");
                navigate('/login');
            })
            .catch(error => {
                console.error('There was an error registering!', error);
                const errorMessage = error.response && error.response.data && error.response.data.error
                    ? error.response.data.error
                    : 'Registration failed';
                Toast.error(errorMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className='bg-[#FAF7F5] min-h-screen flex items-center justify-center p-4'>
            <div className="bg-white rounded-xl shadow-2xl px-10 py-6 transform transition-transform w-full max-w-md">
                {/* <img src={todoImage} alt="Register" className="w-36 mb-2 mx-auto animate-float" /> */}
                <h1 className="  text-2xl font-bold text-center flex items-center justify-center gap-2">Create Account</h1>
                <p className="text-center text-gray-600 text-36">Join Tastebite today</p>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
                    <label className='font-semibold text-sm'>Full Name</label>
                    <div className="relative w-full">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Your Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
                        />
                    </div>
                    <label className='font-semibold text-sm'>Email</label>
                    <div className="relative w-full">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
                        />
                    </div>
                    <label className='font-semibold text-sm'>Role</label>
                    <div className="relative w-full">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="appearance-none bg-[#FAF7F5] w-full border p-2 pl-10 pr-10 rounded-xl border-gray-300 
  focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition cursor-pointer"
                            // className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
                        >
                            <option value="" >Select Role</option>
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <label className='font-semibold text-sm'>Password</label>
                    <div className="relative w-full">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="password"
                            placeholder=".........."
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-[#FAF7F5] w-full border p-2 pl-10 rounded-xl border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-200 transition"
                        />
                    </div>
                    <p className="text-gray-600 text-sm">At least 6 characters</p>
                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-1 flex items-center justify-center gap-2 
           bg-[#F97015] 
           p-2 rounded-lg
           hover:bg-[#F97015]/90
           transition"

                    >
                        {loading ? 'Creating account...' : (
                            <>
                                <UserPlus size={20} className="text-black-700" />
                                Create Account
                            </>
                        )}
                    </button>

                    <p className="text-center text-sm text-gray-600">Already have an account? <a href="/login" className='text-[#F97015]'>Sign in</a></p>
                </form>
            </div>
        </div>
    )
}

export default Register
