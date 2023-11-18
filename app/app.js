import express from "express";
import userRoutes from "../routes/userRoutes.js";

const app= express();

app.use(express.json());

// routes 
app.use('/api/v1/user', userRoutes)
export default app;

