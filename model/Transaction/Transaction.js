const mongoose = require('mongoose');


const transactionSchema = new mongoose.Schema({
    
    description:{
        type:String,
        default:'i need transaction',
        
    },
    chargenum:{
        type:Number,
        default: 0,
    },
    category:{
        type: String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    firstname:{
        type:String,

    },
    lastname:{
        type:String,
    },
    isComplated:{
        type:Boolean,
        default:false,
        
    }
},{timestamps:true});


const Transaction = mongoose.model('Transaction',transactionSchema);

module.exports = Transaction;