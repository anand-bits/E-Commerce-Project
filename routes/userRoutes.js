import express from "express";
import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl } from "../controller/userCtrl.js";



const userRoutes= express.Router();

userRoutes.post('/register',registerUserCtrl)
userRoutes.post('/login',loginUserCtrl);
userRoutes.get('/profile',getUserProfileCtrl);




export default userRoutes;

