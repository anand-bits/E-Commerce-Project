import User from "../model/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { VerifyToken } from "../utils/verifyToken.js";

// @desc  --- Register User
// @route---- POST/api/v1/users/register
// access Public

// Registration Controller
export const registerUserCtrl = asyncHandler(async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body;

        const userExist = await User.findOne({ email });

        if (userExist) {
            return next(new Error("User exists with Email Id, please login with that Id"));
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            fullname,
            email,
            password: hashedPassword
        });

        res.status(200).json({
            success: true,
            message: "User Registered Successfully"
        });
    } catch (err) {
        next(new Error(err.message));
    }
});

// Login Controller
export const loginUserCtrl = asyncHandler(async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Verify if the user exists
        const userFound = await User.findOne({ email });

        if (!userFound) {
            throw new Error("User does not exist with the provided Email Id. Please register first.");
        }

        // Compare passwords
        if (userFound && (await bcrypt.compare(password, userFound?.password))) {
            const token = generateToken(userFound?._id);

            // Set the token as a cookie
            res.cookie('token', token, { httpOnly: true, maxAge: 3 * 24 * 60 * 60 * 1000 });

            res.status(200).json({
                success: true,
                message: "Login Successfully",
                userFound,
                token
            });
        } else {
            throw new Error("Invalid login credential");
        }
    } catch (err) {
        // Handle errors
        next(err);
    }
});


/// @desc    Get user profile
// @route   GET /api/v1/users/profile
// @access  Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    //find the user
    const user = await User.findById(req.userAuthId).populate("orders");
    res.json({
      status: "success",
      message: "User profile fetched successfully",
      user,
    });
  });



  // Description Update the shipping address
  //@route PUT/api/v1/users/update/shipping  
// @acess Private 

export const updateShippingAddressCtrl= asyncHandler(async(req,res)=>
{
    const {firstName, lastName,address,city,postalCode,province,phone}=req.body;

    const user = await User.findByIdAndUpdate(req.userAuthId,{
        shippingAddress:{
            firstName,
            lastName,
            address,
            city,
            postalCode,
            province,
            phone
        },
        hasShippingAddress:true,
    },
    {
        new:true,
    }
    );

    res.json({
        status: "success",
        message: "User Address  successfully Saved",
        user,
      });
})

  

