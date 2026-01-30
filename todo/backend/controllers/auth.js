const express = require('express');
const User = require('../models/auth');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const hashedPassword = await bycrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await bycrypt.compare(password, user.password)) {
      const token = jwt.sign({userID: user._id,name: user.username}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
      res.status(200).json({ message: 'Login successful' , token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
const getme = async (req, res) => {
  try {
    const user = await User.findById(req.user.userID).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
module.exports = { registerUser, loginUser, getme };