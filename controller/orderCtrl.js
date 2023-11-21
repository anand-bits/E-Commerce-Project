import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import mongoose from "mongoose";
import Stripe from "stripe";
import { config } from "dotenv";
config();

// stripe Instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// @description Create Order
// @route POST /api/v1/orders
// @access Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress: reqShippingAddress, totalPrice } = req.body;

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

    // Push order into user
    user.orders.push(order?._id);
    await user.save();

    // Additional steps for payment, webhook, etc.
    // ...

    // Stripe Session
    const convertedOrders = orderItems.map((item) => {
      return {
        price_data: {
          currency: "INR",
          product_data: {
            name: item?.name,
            description: item?.description,
          },
          unit_amount: item?.price * 100,
        },
        quantity: item?.qty,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: convertedOrders,
      metadata: {
        orderId: JSON.stringify(order?._id),
      },
      mode: 'payment',
      success_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    });

    res.send({ url: session.url });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc Get all the orders
// @route Get /api/v1/orders
// @acess private
export const getAllordersCtrl = asyncHandler(async (req, res) => {
  try {
    // find all the order
    const orders = await Order.find();
    res.status(201).json({
      success: true,
      message: "Here ur all The order",
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// @desc get single order
// @route GET /api/v1/orders/:id

export const getSingleOrderCtrl = asyncHandler(async (req, res) => {
  //get the id from params
  const id = req.params.id;



    // Check if the provided orderId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    // Convert the orderId to a valid ObjectId
    const orderid = new mongoose.Types.ObjectId(id);
  const order = await Order.findById(orderid);
  //send response
  res.status(200).json({
    success: true,
    message: "Single order",
    order,
  });
});


// @desc update order to delivered
// @route PUT /api/v1/orders/update/:id


export const updateOrderCtrl = asyncHandler(async (req, res) => {
  try {
    // get the id from params
    const orderId = req.params.id;

    // Check if the provided orderId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Order ID",
      });
    }

    // Convert the orderId to a valid ObjectId
    const objectId = new mongoose.Types.ObjectId(orderId);

    // update
    const updatedOrder = await Order.findByIdAndUpdate(
      objectId,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    // Check if the order exists
    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order updated",
      updatedOrder,
    });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
