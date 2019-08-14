const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb:localhost:27017/ecom', { useNewUrlParser : true, useCreateIndex : true }, (err)=>{
    if (err) throw err;
    console.log('Database is connected');
})















const port = process.env.PORT || 5000;

app.listen(`${port}`, (err)=>{
    if (err) throw err;
    console.log(`Server is running on ${portx}`)    
})