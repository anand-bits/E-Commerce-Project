import Router from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import { createOrderCtrl, getAllordersCtrl, getSingleOrderCtrl, updateOrderCtrl } from "../controller/orderCtrl.js";


const orderRouter= Router();

orderRouter.post("/",isLoggedIn,createOrderCtrl)
orderRouter.get("/",isLoggedIn,getAllordersCtrl);
orderRouter.get("/:id",isLoggedIn,getSingleOrderCtrl);
orderRouter.put("/update/:id",isLoggedIn,updateOrderCtrl)


export default orderRouter;
