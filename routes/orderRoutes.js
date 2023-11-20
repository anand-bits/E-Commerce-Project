import Router from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createOrderCtrl } from "../controller/orderCtrl.js";


const orderRouter= Router();

orderRouter.post("/",isLoggedIn,createOrderCtrl)


export default orderRouter;
