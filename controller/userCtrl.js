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
            res.status(200).json({
                success: true,
                message: "Login Successfully",
                userFound,
                token: generateToken(userFound?._id) 
            });
        } else {
            throw new Error("Invalid login credential");
        }
    } catch (err) {
        // Ensure that the argument passed to `throw new Error` is a plain object
        const errorObject = {
            message: err.message,
            stack: err.stack
        };
        throw new Error(JSON.stringify(errorObject));
    }
});

//@desc Get user Profile
// route get /profile,
// acess Priavate...

export const getUserProfileCtrl= asyncHandler(async (req,res)=>
{// Assuming getTokenFromHeader is a function that accepts req as an argument

    
    const token = getTokenFromHeader(req);

// Verify The token
const verified = VerifyToken(token);
console.log(verified);


res.status(200).json({
    status: true,
    message: "Hello, this is your profile"
})

}
);

