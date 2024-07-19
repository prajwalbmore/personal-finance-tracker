const express = require('express');
const bodyparser = require('body-parser');
require('dotenv').config();
const mongoDB = require('./config/db');
const routAPI = require('./routes/app');

const app = express();
Port = process.env.Port || 6000;

app.use(express.json());
app.use(bodyparser.json());

mongoDB.connectDB();

app.use('/api',routAPI);

app.listen(Port,()=>{
    console.log("Server is started on",Port)
})