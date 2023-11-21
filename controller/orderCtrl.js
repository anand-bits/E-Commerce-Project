import asyncHandler from "express-async-handler";
import Order from "../model/Order.js";
import User from "../model/User.js";
import Product from "../model/Product.js";

// @description Create Order
// @route POST /api/v1/orders
// @access Private
export const createOrderCtrl = asyncHandler(async (req, res) => {
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;
    console.log(req.body);
    //Find the user
    const user = await User.findById(req.userAuthId);
    //Check if user has shipping address
   
    //Check if order is not empty
    if (orderItems?.length <= 0) {
      throw new Error("No Order Items");
    }
    //Place/create order - save into DB
    const order = await Order.create({
      user: user?._id,
      orderItems,
      shippingAddress,
      // totalPrice: couponFound ? totalPrice - totalPrice * discount : totalPrice,
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
  //push order into user
  user.orders.push(order?._id);
  await user.save();
    // Additional steps for payment, webhook, etc.
    // ...

    res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});
