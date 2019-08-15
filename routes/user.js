const express = require('express');
const router = express.Router();


const User = require('../models/user.js');


router.get('/signup',(req,res)=>{
    res.render('signup',{errors:req.flash('errors')});
})

router.post('/signup',(req,res,next)=>{
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.profile.name = req.body.name;

    User.findOne({email : req.body.email},(err, match)=>{
        if(match){
            req.flash('errors','User already exists')
            res.redirect('/user/signup');
        }else{
            newUser.save((err)=>{
                if (err) return next(err);
                res.send('User created succesfully')
            });
        }
    });
});


module.exports= router;