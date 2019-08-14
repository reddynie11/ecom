const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//models
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/ecom', { useNewUrlParser : true, useCreateIndex : true }, (err)=>{
    if (err) throw err;
    console.log('Database is connected');
})

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.post('/register', (req,res,next)=>{
    const newUser = new User();

    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.profile.name = req.body.name;
    newUser.save((err)=>{
        if (err) next(err);
        res.send('User created succesfully')
    })
})















const port = process.env.PORT || 5000;

app.listen(`${port}`, (err)=>{
    if (err) throw err;
    console.log(`Server is running on ${port}`)    
})