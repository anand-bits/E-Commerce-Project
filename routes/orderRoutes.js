import Router from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createOrderCtrl, getAllordersCtrl, getOrderStatsCtrl, getSingleOrderCtrl, updateOrderCtrl } from "../controller/orderCtrl.js";


const orderRouter= Router();

orderRouter.post("/",isLoggedIn,createOrderCtrl)
orderRouter.get("/",isLoggedIn,getAllordersCtrl);
orderRouter.get("/:id",isLoggedIn,getSingleOrderCtrl);
orderRouter.put("/update/:id",isLoggedIn,updateOrderCtrl)
orderRouter.get("/sales/sum",isLoggedIn,getOrderStatsCtrl)


export default orderRouter;
