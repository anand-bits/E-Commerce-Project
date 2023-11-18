import User from "../model/User.js";
import AppError from "../utils/error.utils.js";
import bcrypt from "bcrypt";

// @desc  --- Register User
// @route---- POST/api/v1/users/register
//acess Private/admin

// Registratoon Controller
export const registerUserCtrl= async(req,res,next)=>
{   
    const {fullname,email,password}=req.body;

    const userExit=await User.findOne({email});

    if(userExit)
    {
        return next(new AppError("User exist with Email Id plese Login form that Id"),400);

    }
    const salt=await bcrypt.genSalt(10);

    const hashedPassword= await bcrypt.hash(password,salt)

    const user=await User.create({
        fullname,email,
        password:hashedPassword
    });

    res.status(200).json({
        success:true,
        message:"User Registered Successfully"

    })
}

// Login Controller

export const loginUserCtrl= async(req,res,next)=>
{
    const {email,password}= req.body;

    // First Verify the user exist or not---------

    const userFound=await User.findOne({email});

    if(!userFound)
    {
        return next(new AppError("User exist with Email Id plese Login form that Id"),400);

    }

}


