const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// user schema
const userSchema = new Schema({
    email : {
        type : String,
        unique:true,
        lowercase:true,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    profile : {
        name : {type:String, default:''},
        picture:{ type:String, default:'' }
    },
    address: String,
    history:[{
        date : Date,
        paid:{ type:Number, default:0}
    }]
})

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(10, function(err, salt){
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err,hash){
                if(err) return next(err);
                user.password=hash;
                next()
            })
        })
    }else{
        next();
    }
});

userSchema.methods.comparePass = function(uipassword){
    bcrypt.compare(uipassword,this.password)
}