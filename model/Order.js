
import mongoose  from "mongoose";

const Schema= mongoose.Schema;
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);

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
        default:randomTxt+randomNumbers
    },
    paymentStatus:{
        type:String,
        required:true,
        default:"Not paid"
    },

    paymentMethod:{
        type:String,
        default:"Not specified"
    },
    currency:{
        type:String,
        default:"Not specified",

    },
    //for admin
    
    status:{
        type:String,
        default:"Pending",
        enum:["pendin","processing","shipped","deliverd"],

    },
    deliveredAt:{
        type:Date
    },
},
{
    timestamps:true

});


// Compile To form the model

const Order= mongoose.model("Order",OrderSchema)
export default Order;