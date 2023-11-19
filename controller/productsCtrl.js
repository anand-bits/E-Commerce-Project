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
    let productQuery=Product.find();

   
// Product with name To find From the req body.

    if(req.query.name)
    {
        productQuery=productQuery.find({name:{
            $regex:req.query.name, $options:"i"
        }});


    }
// Product By brand 

if(req.query.brand)
{
    productQuery=productQuery.find({brand:{
        $regex:req.query.brand, $options:"i"
    }});


}

// Filter By category 

if(req.query.category)
{
    productQuery=productQuery.find({category:{
        $regex:req.query.category, $options:"i"
    }});


}



    const product= await productQuery;


    res.json({

        success:true,
        product

    })

})


