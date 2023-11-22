import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";
import mongoose from "mongoose";
import Stripe from "stripe";
import { config } from "dotenv";
import Coupon from "../model/Coupon.js";
config();

// stripe Instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// @desc Create an order
// @route POST /api/v1/
// @desc Create an order

export const createOrderCtrl = asyncHandler(async (req, res) => {
  try {
    // 
    const { coupon } = req?.query;

    // Find the coupon in the database
    const couponFound = await Coupon.findOne({
      code: coupon?.toUpperCase(),
    });

    // Check if the coupon exists
    if (!couponFound) {
      throw new Error("Coupon does not exist");
    }

    // Check if the coupon is expired
    if (couponFound.isExpired) {
      throw new Error("Coupon has expired");
    }

    // Calculate the discount based on the coupon
    const discount = couponFound.discount / 100;

    // Get order items and shipping address from the request body
    const { orderItems, shippingAddress: reqShippingAddress } = req.body;

    // Find the user by their authentication ID
    const user = await User.findById(req.userAuthId);

    // Check if the user has a default shipping address
    let shippingAddress;
    if (user?.hasShippingAddress) {
      shippingAddress = user.shippingAddress;
    } else {
      // If not, use the one provided in the request body
      shippingAddress = reqShippingAddress;

      // Check if shipping address is provided
      if (!shippingAddress) {
        throw new Error("Provide the shipping address");
      }
    }

    // Check if order items are provided and not empty
    if (!orderItems || orderItems.length === 0) {
      throw new Error("No Order Items");
    }

    // Calculate the total price for the order
    const totalPrice = await orderItems.reduce(async (accPromise, order) => {
      const acc = await accPromise;
      // Find the corresponding product for the order item
      const product = await Product.findOne({ _id: order?._id?.toString() });

      // Check if the product is found
      if (!product) {
        throw new Error(`Product not found for order item with ID: ${order?._id}`);
      }

      // Update the totalSold for the product
      product.totalSold += order.qty;
      await product.save();

      // Calculate the total price for the current item
      const itemTotalPrice = order.qty * order.price;

      // Check if the calculated total price is valid
      if (isNaN(itemTotalPrice)) {
        throw new Error(`Invalid price for product: ${product.name}`);
      }

      return acc + itemTotalPrice;
    }, Promise.resolve(0));

    // Calculate the final total price after applying the discount
    const finalTotalPrice = couponFound ? totalPrice - totalPrice * discount : totalPrice;

    // Create the order document in the database
    const order = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      totalPrice: finalTotalPrice,
    });

    // Push the order ID into the user's orders array
    user.orders.push(order?._id);
    await user.save();

    // Map the order items to the format required by Stripe
    const convertedOrders = orderItems.map((item) => ({
      price_data: {
        currency: "INR",
        product_data: {
          name: item?.name,
          description: item?.description,
        },
        unit_amount: finalTotalPrice * item.qty,
      },
      quantity: item?.qty,
    }));

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      line_items: convertedOrders,
      metadata: {
        orderId: JSON.stringify(order?._id),
      },
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    // Send the Stripe checkout session URL as the response
    res.send({ url: session.url });
  } catch (error) {
    // Handle errors and send a response with an error message
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




//@desc get sales Sum of orderrs
//@routes Get api/v1/orders/sales/sum
//Acccess private /admin


export const getOrderStatsCtrl = asyncHandler(async (req, res) => {
  //get order stats
  const orders = await Order.aggregate([
    {
      $group: {
        _id: null,
        minimumSale: {
          $min: "$totalPrice",
        },
        totalSales: {
          $sum: "$totalPrice",
        },
        maxSale: {
          $max: "$totalPrice",
        },
        avgSale: {
          $avg: "$totalPrice",
        },
      },
    },
  ]);
  //get the date
  const date = new Date();
  const today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const saleToday = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $gte: today,
        },
      },
    },
    {
      $group: {
        _id: null,
        totalSales: {
          $sum: "$totalPrice",
        },
      },
    },
  ]);
  //send response
  res.status(200).json({
    success: true,
    message: "Sum of orders",
    orders,
    saleToday,
  });
});