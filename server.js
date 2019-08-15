const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ejs_mate = require('ejs-mate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');

//models
const User = require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/ecom', { useNewUrlParser : true, useCreateIndex : true }, (err)=>{
    if (err) throw err;
    console.log('Database is connected');
})

//middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cookieParser());
app.use(session({
    resave:true,
    saveUniinitialized:true,
    secret:'SUPER'
}));
app.use(flash());
app.engine('ejs', ejs_mate);
app.set('view engine','ejs' )

//routes
const mainRoute = require('./routes/main.js');
const userRoute=require('./routes/user.js');


app.use(mainRoute)
app.use('/user', userRoute);



const port = process.env.PORT || 5000;

app.listen(`${port}`, (err)=>{
    if (err) throw err;
    console.log(`Server is running on ${port}`)    
})