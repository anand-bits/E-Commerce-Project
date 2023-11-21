import Router from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createOrderCtrl, getAllordersCtrl } from "../controller/orderCtrl.js";


const orderRouter= Router();

orderRouter.post("/",isLoggedIn,createOrderCtrl)
orderRouter.get("/",isLoggedIn,getAllordersCtrl);


export default orderRouter;
