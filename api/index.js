const express = require('express')
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//import routes
const authRoute = require('./routes/auth');


dotenv.config();

//Connect to DB

mongoose.connect(
    process.env.DB_CONNECT,
    {useNewUrlParser:true},
    () => console.log('connected to db ..')
);

//Middleware

app.use(express.json());

//Route Middlewares

app.use('/api/user', authRoute);

app.listen(3000,()=>console.log('Server Up and Running ..'));

