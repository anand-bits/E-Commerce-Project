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

// Filter By price Range --------------->

if(req.query.price)
{
    const priceRange= req.query.price.split("-");
    // gte:- Greater or Equal to
    //lte:- less than or Equal to

    productQuery=productQuery.find({
        price:{$gte:priceRange[0], $lte:priceRange[1]},

    })


}
// Pagination
//Page
const page= parseInt(req.query.page)? parseInt(req.query.page):1;

const limit=parseInt(req.query.limit)? parseInt(req.query.limit):10;

//start Index
const startIndex=(page-1)*limit;
// endIdx
const endIndex= page *limit;
// const total
const total= await Product.countDocuments();

productQuery= productQuery.skip(startIndex).limit(limit);




// Pagination Result -----------

const pagination={

};
if(endIndex<total)
{
    pagination.next={
        page:page+1,
        limit,
    };

}
if(startIndex>0)
{
    pagination.prev={
        page:page-1,
        limit

    }
}


    const product= await productQuery;


    res.json({

        success:true,
        results:product.length,
        pagination,
        message:'Products Fetched',
        product

    })

})


