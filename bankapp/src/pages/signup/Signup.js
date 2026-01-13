import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { createUserWithEmailAndPassword ,updateProfile} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate=useNavigate();
  async function handlesubmit(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      console.log("User created:", user);
      console.log("User registered successfully!");
      navigate('/login');
    }
    catch (error) {
      alert("Error creating user:", error.message);
    }
    setName("");
    setEmail("");
    setPassword("");

  }
  return (
    <div>
      <h1>Sign Up Page</h1>
      <form onSubmit={handlesubmit}>
        <input type='text' placeholder='Enter Name' value={name} onChange={(e) => { setName(e.target.value) }} />
        <br />
        <input type='email' placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <br />
        <input type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
        <br />
        <button type='submit'>Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Signup
