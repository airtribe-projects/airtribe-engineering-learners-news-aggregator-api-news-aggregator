const mongoose = require('mongoose');
const validator = require("validator");

const userModel = require('./userModel');

const userSchema = new mongoose.Schema({

  first_name: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    lowercase: true,
    minlength: [3, 'First name must be at least 3 characters long'],
    maxlength: [50, 'First name cannot exceed 50 characters']
  },
  middle_name: {
    type: String,
    required: [false, 'Middle name is required'],
    trim: true,
    lowercase: true,
    minlength: [3, 'Middle name must be at least 3 characters long'],
    maxlength: [50, 'Middle name cannot exceed 50 characters']
  },
  last_name: {
    type: String,
    required: [false, 'Last name is required'],
    trim: true,
    lowercase: true,
    minlength: [3, 'Last name must be at least 3 characters long'],
    maxlength: [50, 'Last name cannot exceed 50 characters']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [/^\d{10}$/, 'Please provide a valid 10-digit phone number'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    unique: [true,'A user is already registered with this email address.'],
    validate: validateEmail,
    match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
    ]
  },
  role: {
    type: String,
    default: "user",
    enum: ['admin', 'user'],
    required: true
  },
  date_Of_birth: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: Date
});

async function validateEmail(email) {
  if (!validator.isEmail(email)) throw new Error("Please enter a valid email address.")
  // const user = await userModel.findOne({ email })
  // if (user) throw new Error("A user is already registered with this email address.")
}

const User = mongoose.model('Users', userSchema);

module.exports = User; 