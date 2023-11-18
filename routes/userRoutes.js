import express from "express";
import { loginUserCtrl, registerUserCtrl } from "../controller/userCtrl.js";



const userRoutes= express.Router();

userRoutes.post('/register',registerUserCtrl)
userRoutes.post('/login',loginUserCtrl);




export default userRoutes;

