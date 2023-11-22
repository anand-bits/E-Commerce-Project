import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brands.js";

// @desc Create new Product
// @route POST /api/v1/products/createproduct
// @access Private/Admin
export const createProductCtrl = asyncHandler(async (req, res, next) => {
    try {
    
    // url for Image of pr
        const convertedImgs= req.files.map((file)=>file.path);


    // Get coupon code from query parameter
        const { name, description, category, sizes, colors, price, totalQty, brand } = req.body;

        // Product Existence Check
        const productExist = await Product.findOne({ name });

        if (productExist) {
            return res.status(400).json({
                status: "Error",
                message: "Product already exists"
            });
        }
        // find the Category Of Product means Category of product means like its category of men and wqmen 
        const categoryFound= await Category.findOne({
            name:category,
        })
        if(!categoryFound)
        {
            throw new Error("Category Not found , please Create Category First or check Category Name")
        }


           
           // find the Brand  Of Product, means Brand of product means like its Brand Nike ,puma 
           const brandFound= await Brand .findOne({
               name:brand.toLowerCase()
           })
           if(!brandFound)
           {
               throw new Error("Brand  Not found , please Create Brand  First or check Brand Name")
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
            brand,
            images:convertedImgs
        });

        // Pushing the product id into category.
        // this will help for this men category have these brand ....

        categoryFound.products.push(product._id);

        await categoryFound.save()

        // Pushing the product id into Brand schema 
        // this will help to knw this brand product is available.

        brandFound.products.push(product._id)
        await brandFound.save();

        // Respond with 201 Created
        res.status(201).json({
            status: "Success",
            message: "Product created successfully",
            product
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware or error handler
    }
});


// @desc Get Products
// @route GET /api/v1/products
// @access Public
export const getProductsCtrl = asyncHandler(async (req, res) => {
    try {
        let productQuery = Product.find();

        // Product with name To find From the req body.
        if (req.query.name) {
            productQuery = productQuery.find({
                name: {
                    $regex: req.query.name, $options: "i"
                }
            });
        }

        // Product By brand
        if (req.query.brand) {
            productQuery = productQuery.find({
                brand: {
                    $regex: req.query.brand, $options: "i"
                }
            });
        }

        // Filter By category
        if (req.query.category) {
            productQuery = productQuery.find({
                category: {
                    $regex: req.query.category, $options: "i"
                }
            });
        }

        // Filter By price Range --------------->
        if (req.query.price) {
            const priceRange = req.query.price.split("-");
            // gte:- Greater or Equal to
            // lte:- less than or Equal to
            productQuery = productQuery.find({
                price: { $gte: priceRange[0], $lte: priceRange[1] },
            });
        }

        // Pagination
        // Page
        const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1;
        const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

        // Start Index
        const startIndex = (page - 1) * limit;
        // End Index
        const endIndex = page * limit;
        // Total
        const total = await Product.countDocuments();

        productQuery = productQuery.skip(startIndex).limit(limit);

        // Pagination Result -----------
        const pagination = {};

        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit,
            };
        }

        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }

        const product = await productQuery.populate("reviews");

        res.json({
            success: true,
            results: product.length,
            pagination,
            message: 'Products Fetched',
            product
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware or error handler
    }
});


// @desc Get Single Product
// @route GET /api/v1/products/:id
// @access Public
export const getProductCtrl = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("reviews");

        if(!product)
        {
            throw new Error("Product Not found")
        }

        res.json({
            success: true,
            message: "Product fetched successfully",
            product
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware or error handler
    }
});


// @desc Update  Product by Product Id
// @route put  /api/v1/products/:id
// @access Private /admin
export const updateProductCtrl = asyncHandler(async (req, res) => {
    try {
        const { name, description, category, sizes, colors, user, price, totalQty, brand } = req.body;


        const product= await Product.findByIdAndUpdate(req.params.id,{
            name, description, category, sizes, colors, user, price, totalQty, brand,
        },
        {
            new: true,
        }
        
        )

        res.json({
            success: true,
            message: "Product Updated  successfully",
            product
        });
    } catch (error) {
        next(error); // Pass the error to the next middleware or error handler
    }
});



// @desc Delete  Product
// @route Delete  /api/v1/products/:id
// @access Private /admin

export const deleteProductCtrl= asyncHandler(async(req,res)=>
{
    const product= await Product.findByIdAndDelete(req.params.id)
    
    res.json({
        success: true,
        message: "Product Deleted  successfully",
        product
    });
})
