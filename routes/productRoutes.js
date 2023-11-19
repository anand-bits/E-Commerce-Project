import { Router } from "express";

import { createProductCtrl } from "../controller/productsCtrl.js"
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const productRoutes= Router()

productRoutes.post("/createproduct", isLoggedIn,createProductCtrl)

export default productRoutes;