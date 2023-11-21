import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import Razorpay from 'razorpay';
import { config } from "dotenv";
config(); 
//RazorPay Implementation Secret Key and Id from env file 
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
  });
  

// @description Create Order
// @route POST /api/v1/orders
// @access Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress: reqShippingAddress, totalPrice } = req.body;
    console.log(req.body);
    
    // Find the user
    const user = await User.findById(req.userAuthId);

    // Check if user has shipping address
    let shippingAddress;
    if (user?.hasShippingAddress) {
      // If user has a shipping address, use that
      shippingAddress = user.shippingAddress;
    } else {
      // If not, use the one provided in the request body
      shippingAddress = reqShippingAddress;

      // Check if shipping address is provided
      if (!shippingAddress) {
        throw new Error("Provide the shipping address");
      }
    }

    // Check if order is not empty
    if (orderItems?.length <= 0) {
      throw new Error("No Order Items");
    }

    // Place/create order - save into DB
    const order = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      totalPrice,
    });
    
     // Create Razorpay order
     const razorpayOrder = await razorpay.orders.create({
        amount: totalPrice * 100, // Razorpay amount is in paise
        currency: 'INR', // Change this to your currency
        receipt: order._id.toString(), // Use your own logic for generating a receipt ID
        payment_capture: 1, // Auto-capture payment
      });

    const products = await Product.find({ _id: { $in: orderItems } });

    orderItems?.map(async (order) => {
      const product = products?.find((product) => {
        return product?._id?.toString() === order?._id?.toString();
      });
      if (product) {
        product.totalSold += order.qty;
      }
      await product.save();
    });

    order.razorpayOrderId = razorpayOrder.id;
    // Push order into user
    user.orders.push(order?._id);
    await user.save();


    // Additional steps for payment, webhook, etc.
    // ...

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
      razorpayOrderId: razorpayOrder.id,
      razorpayAmount: razorpayOrder.amount,
      razorpayCurrency: razorpayOrder.currency,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
