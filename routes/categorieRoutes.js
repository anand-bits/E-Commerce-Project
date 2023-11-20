import { Router } from "express";
import { createCategoryCtrl, deleteCategoryCtrl, getAllCategoriesCtrl, getSingleCategoryCtrl, updateCategoryCtrl } from "../controller/categoriesCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";

const categoriesRouter=Router();

categoriesRouter.post("/createcategory",isLoggedIn,createCategoryCtrl);
categoriesRouter.get("/", getAllCategoriesCtrl);
categoriesRouter.get("/:id", getSingleCategoryCtrl);
categoriesRouter.put("/:id",isLoggedIn, updateCategoryCtrl)
categoriesRouter.delete("/:id",isLoggedIn, deleteCategoryCtrl);
;


 export default categoriesRouter;
