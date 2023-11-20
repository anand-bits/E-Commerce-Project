import exppress from "express";


import { createColorCtrl, deleteColorCtrl, getAllColorsCtrl, getSingleColorCtrl, updateColorCtrl } from "../controller/colorCtrl.js";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
const colorRouter = exppress.Router();


colorRouter.post("/", isLoggedIn, createColorCtrl);
colorRouter.get("/", getAllColorsCtrl);
colorRouter.get("/:id", getSingleColorCtrl);
colorRouter.delete("/:id", isLoggedIn, deleteColorCtrl);
colorRouter.put("/:id", isLoggedIn, updateColorCtrl);

export default colorRouter;