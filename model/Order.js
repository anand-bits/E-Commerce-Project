
import mongoose  from "mongoose";

const Schema= mongoose.Schema;

const OrderSchema= new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,

    },

    orderItems:[
        {
        type:Object,
        required:true,
        }

    ],

    shippingAddress:{
        type:Object,
        required:true,


    },

    orderNumber:{
        type:String,
        required:true,
        default:
    }
})