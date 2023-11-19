import express from "express";
import userRoutes from "../routes/userRoutes.js";
import { globalErrHandler, notFound } from "../middleware/globalErrHandler.js";
import productRoutes from "../routes/productRoutes.js";
import categoryRouter from "../routes/categorieRoutes.js";

const app = express();

app.use(express.json());

// routes
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/category',categoryRouter)

// middleware
app.use(notFound);
app.use(globalErrHandler);

export default app;
