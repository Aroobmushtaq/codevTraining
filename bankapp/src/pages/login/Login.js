import React from 'react'
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {auth} from '../../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigate} from 'react-router-dom';
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();
    async function handlesubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all the fields");
            return;
        }
        if (password.length < 6) {
            alert("Password should be at least 6 characters");
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
        <div>
            <form onSubmit={handlesubmit}>
            <h1>Login Page</h1>
            <input type='email' placeholder='Enter Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            <br />
            <input type='password' placeholder='Enter Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
            <br />
            <button type='submit'>Login</button>
            </form>
            <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
    )
}

export default Login
