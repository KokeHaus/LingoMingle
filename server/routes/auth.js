const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user'); 
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    let newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      res.status(400).json({ message: "Username or email already exists" });
      return; 
    }
    res.status(500).json({ message: error.message });
  }
});

  
  

router.post('/signin', async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      console.log('User found:', user); // For debugging, remove in production
  
      if (user) {
        const isMatch = await user.comparePassword(req.body.password);
        console.log('Password match:', isMatch); // For debugging, remove in production
  
        if (isMatch) {
          const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1d' });
          res.json({ token, username: user.username });
        } else {
          res.status(401).send("Authentication failed");
        }
      } else {
        res.status(401).send("User not found");
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      res.status(500).send(error.message);
    }
  });
  

module.exports = router;
