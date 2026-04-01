import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/config';
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // ✅ Loading state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true); // ✅ Start loading
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in:', userCredential.user);
      navigate('/todo');
    } catch (err) {
      console.error('Error logging in:', err.message);
      setError(err.message);
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Sign in to your account</h2>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-full rounded-md px-3 py-2 border"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full rounded-md px-3 py-2 border"
            />
          </div>

          {/* ✅ Button with loading */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md py-2 font-semibold border bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold underline hover:text-green-600">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
