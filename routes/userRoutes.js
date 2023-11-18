import express from "express";
import { registerUserCtrl } from "../controller/userCtrl.js";



const userRoutes= express.Router();

userRoutes.post('/register',registerUserCtrl)



export default userRoutes;

