import express from "express";
import userRoutes from "../routes/userRoutes.js";
import { globalErrHandler, notFound } from "../middleware/globalErrHandler.js";

const app= express();

app.use(express.json());

// routes 
app.use('/api/v1/user', userRoutes)




// middleware-------------
app.use(notFound);
app.use( globalErrHandler);
export default app;

