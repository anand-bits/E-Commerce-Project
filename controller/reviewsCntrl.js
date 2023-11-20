import Product from "../model/Product.js";
import Review from "../model/Review.js";
import asyncHandler from "express-async-handler";

export const createReviewCtrl = asyncHandler(async (req, res) => {
  try {
    const { productID } = req.params;
    const { message, rating } = req.body;

    // Find the product
    const productFound = await Product.findById(productID);
    if (!productFound) {
      throw new Error("Product not found");
    }

    // Check if the user already reviewed the product
    const existingReview = await Review.findOne({
      product: productFound._id,
      user: req.userAuthId,
    });

    if (existingReview) {
      throw new Error("User already reviewed this product");
    }

    // Create review
    const review = await Review.create({
      message,
      rating,
      product: productFound._id,
      user: req.userAuthId,
    });

    // Push the review into product found
    productFound.reviews.push(review._id);
    await productFound.save();

    res.status(200).json({
      status: "success",
      message: "Review created successfully",
      review,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});
