import { Router } from "express";
import { createBrandCtrl, deleteBrandCtrl, getAllBrandsCtrl, getSingleBrandCtrl, updateBrandCtrl } from "../controller/brandsCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const brandsRouter = Router();

brandsRouter.post("/createbrand", isLoggedIn, createBrandCtrl);
brandsRouter.get("/", getAllBrandsCtrl);
brandsRouter.get("/:id", getSingleBrandCtrl);
brandsRouter.put("/:id",isLoggedIn, updateBrandCtrl);
brandsRouter.delete("/:id",isLoggedIn, deleteBrandCtrl);

export default brandsRouter;
