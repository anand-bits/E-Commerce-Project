import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

export const createProductCtrl = asyncHandler(async (req, res, next) => {
    const { name, description, category, sizes, colors, user, price, totalQty,brand } = req.body;

    // Product Existence Check
    const productExist = await Product.findOne({ name });

    if (productExist) {
        return res.status(400).json({
            status: "Error",
            message: "Product already exists"
        });
    }

    // Create Product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand
    });

    // Respond with 201 Created
    res.status(201).json({
        status: "Success",
        message: "Product created successfully",
        product
    });
});


export const getProductCtrl= asyncHandler(async(req,res)=>
{
    const product=await Product.find();

    res.json({

        success:true,
        product

    })

})


