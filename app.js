const express = require('express');
require('dotenv').config();
require('colors');
require('./config/config') // Database Connection 
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT; //3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const APIKEY = process.env.NEWS_API_KEY;

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port} `.green.bold);
});

const usersRoute = require('./routes/userRoute');
const newsRoute = require('./routes/newsRoute');
app.use('/api/v1/users/',usersRoute);
app.use('/api/v1/news/',newsRoute);

module.exports = app;