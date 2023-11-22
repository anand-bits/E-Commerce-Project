import exppress from "express";
import { createCouponCtrl, deleteCouponCtrl, getAllCouponsCtrl, getCouponCtrl, updateCouponCtrl } from "../controller/couponCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const couponRouter = exppress.Router();

couponRouter.post("/", isLoggedIn, createCouponCtrl);

couponRouter.get("/", getAllCouponsCtrl);
couponRouter.put("/update/:id", isLoggedIn, updateCouponCtrl);
couponRouter.delete("/delete/:id", isLoggedIn, deleteCouponCtrl);
couponRouter.get("/single", getCouponCtrl);

export default couponRouter;