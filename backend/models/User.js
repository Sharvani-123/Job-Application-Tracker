const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please add a name'],
        trim: true
    },
    email:{
        type:String,
        required: [true, 'Please add an email'],
        unique:true,
        lowercase:true,
        trime:true
    },
    password:{
        type:String,
        required: [true,'Please add a password'],
        minlength:6
    }
},
{
    timestamps:true
});
//hash password before saving to the DB
userSchema.pre('save',async function(next) {
    if(!this.isModified('password')){
        next();
    }

const salt= await bcrypt.genSalt(10);
this.password= await bcrypt.hash(this.password, salt);
});

//Compare password method
userSchema.methods.matchPassword= async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports=mongoose.model('User',userSchema);

