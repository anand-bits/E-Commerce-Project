import User from "../model/User.js";
import AppError from "../utils/error.utils.js";

// @desc  --- Register User
// @route---- POST/api/v1/users/register
//acess Private/admin


export const registerUserCtrl= async(req,res,next)=>
{   
    const {fullname,email,password}=req.body;

    const userExit=await User.findOne({email});

    if(userExit)
    {
        return next(new AppError("User exist with Email Id plese Login form that Id"),400);

    }

    const user=await User.create({
        fullname,email,password
    });

    res.status(200).json({
        success:true,
        message:"User Registered Successfully"

    })
}