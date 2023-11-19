import { Router } from "express";

import { createProductCtrl, getProductCtrl, getProductsCtrl, updateProductCtrl } from "../controller/productsCtrl.js"
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const productRoutes= Router()

productRoutes.post("/createproduct", isLoggedIn,createProductCtrl)
productRoutes.get("/getproducts",getProductsCtrl);
productRoutes.get("/getproduct/:id",getProductCtrl);
productRoutes.put("/updateproduct/:id",isLoggedIn,updateProductCtrl)

export default productRoutes;