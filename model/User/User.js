const mongoose = require('mongoose');
const {isEmail } = require('validator');

const userSchema = new  mongoose.Schema({

    firstname: {
        type:String,
        required:[true,`first name is required !`]
    },
    lastname: {
        type:String,
        required:[true,`last name is required !`]
    },
    profilePhoto: {
        type:String,
    },

    email:{
        type:String,
        required:[true,`Email is required !`],
        validate:[isEmail,'Please Enter Valid Email']
    },
    password:{
        type:String,
        required:[true,`Password is rquired`]
    },
    transCount:{
        type:Number,
        default: 0,
        
    },
    wallet:{
        type:Number,
        default: 0,
    },

    isBlocked:{
        type:Boolean,
        default: false,

    },
    isAdmin:{
        type:Boolean,
        default: false,
        
    },
    role:{
        type:String,
        enum: [`Admin`,`client`],
    },
    viewedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    active:{
        type:Boolean,
        default: true,
    },
    transactions:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Transaction",

    }


},{timestamps:true});




const User = mongoose.model('User',userSchema);

module.exports = User;






