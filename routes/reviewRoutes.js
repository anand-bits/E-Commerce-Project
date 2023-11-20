import Router from "express"
import { createReviewCtrl } from "../controller/reviewsCntrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const reviewRouter= Router();


reviewRouter.post('/:productID',isLoggedIn,createReviewCtrl)



export default reviewRouter;
