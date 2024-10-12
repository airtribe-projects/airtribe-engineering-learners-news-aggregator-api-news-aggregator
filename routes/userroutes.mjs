import express, { json } from 'express';
import User from './../models/userSchema.mjs';  // Import the User model
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { sign} = jwt;
const route = express.Router();
// const app = express();
// app.use(json());

route.post('/users/signup', async (req, res) => {
  const { email, password, preferences } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ email, password, preferences });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


route.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = sign({ id: user._id },process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry


    res.json({
      message: 'Login successful',
      token,  // Send the token to the user
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: `server error ${error}` });
  }
});



export default route;