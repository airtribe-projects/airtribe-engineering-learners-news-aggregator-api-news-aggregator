const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./Routes/authRoutes');
const newsRoutes = require('./Routes/newsRoutes');

// Load environment variables
dotenv.config();

// Connect to the database
connectDB();

const app = express();
app.use(express.json());  // For parsing JSON data

// Routes
app.use('/auth', authRoutes);
app.use('/', newsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));