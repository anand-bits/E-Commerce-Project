import asyncHandler from "express-async-handler"
import Order from "../model/Order.js"


//@description Create Order
// @Route Post/ api/v1/orders
//access Private

export const createOrderCtrl= asyncHandler(async(req,res)=>{


    res.status(200).json({
        success:true,
        message:"Order Created "
    })

})
