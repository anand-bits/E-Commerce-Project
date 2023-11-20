import asyncHandler from "express-async-handler";
import Color from "../model/Color.js";

// @desc    Create new Color
// @route   POST /api/v1/colors
// @access  Private/Admin
export const createColorCtrl = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the color already exists
    const colorFound = await Color.findOne({ name });
    if (colorFound) {
      throw new Error("Color already exists");
    }

    // Create a new color
    const color = await Color.create({
      name: name.toLowerCase(),
      user: req.userAuthId,
    });

    res.json({
      status: "success",
      message: "Color created successfully",
      color,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Get all colors
// @route   GET /api/colors
// @access  Public
export const getAllColorsCtrl = asyncHandler(async (req, res) => {
  try {
    const colors = await Color.find();
    res.json({
      status: "success",
      message: "Colors fetched successfully",
      colors,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
});

// @desc    Get single color
// @route   GET /api/colors/:id
// @access  Public
export const getSingleColorCtrl = asyncHandler(async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) {
      throw new Error("Color not found");
    }
    res.json({
      status: "success",
      message: "Color fetched successfully",
      color,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Update color
// @route   PUT /api/colors/:id
// @access  Private/Admin
export const updateColorCtrl = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Update color
    const color = await Color.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );

    if (!color) {
      throw new Error("Color not found");
    }

    res.json({
      status: "success",
      message: "Color updated successfully",
      color,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: error.message,
    });
  }
});

// @desc    Delete color
// @route   DELETE /api/colors/:id
// @access  Private/Admin
export const deleteColorCtrl = asyncHandler(async (req, res) => {
  try {
    // Delete color
    await Color.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Color deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      message: "Color not found",
    });
  }
});
