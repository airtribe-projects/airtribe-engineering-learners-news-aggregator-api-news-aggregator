const mongoose = require('mongoose');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register =  async (req, res) => {
  try {
    const user = req.body;
    const { email } = req.body;
    const isuser = await User.findOne({ email });
    if (email == isuser.email) {
      return res.status(400).json({ message: 'A user is already registered with this email address.' });
    }
    user.password = await bcrypt.hash(user.password, 10);
    const dbuser = await User.create(user);
    res.status(201).json({ dbuser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid user credentials. Please try again!' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid user credentials. Please try again!' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

