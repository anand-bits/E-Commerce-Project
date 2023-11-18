import User from "../model/User.js";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";

// @desc  --- Register User
// @route---- POST/api/v1/users/register
// access Private/admin

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
                userFound
            });
        } else {
            throw new Error("Invalid login credential");
        }
    } catch (err) {
        next(new Error(err.message));
    }
});
