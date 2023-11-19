import { Router } from "express";

import { createProductCtrl, getProductCtrl } from "../controller/productsCtrl.js"
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const productRoutes= Router()

productRoutes.post("/createproduct", isLoggedIn,createProductCtrl)
productRoutes.get("/getproduct",isLoggedIn,getProductCtrl);

export default productRoutes;