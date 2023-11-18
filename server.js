import app from "./app/app.js";
import http from 'http';
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";

// Load environment variables from .env file
config();

const PORT =5000;
await dbConnect()

const server = http.createServer(app);

server.listen(PORT, async () => {

 console.log(`Server is running at ${PORT}`);
});
