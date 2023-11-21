import express from "express";
import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl, updateShippingAddressCtrl } from "../controller/userCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";



const userRoutes= express.Router();

userRoutes.post('/register',registerUserCtrl)
userRoutes.post('/login',loginUserCtrl);
userRoutes.get('/profile',isLoggedIn,getUserProfileCtrl);
userRoutes.put('/update/shipping',isLoggedIn,updateShippingAddressCtrl);




export default userRoutes;

