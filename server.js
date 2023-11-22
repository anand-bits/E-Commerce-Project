import app from "./app/app.js";
import http from 'http';
import { config } from "dotenv";
import dbConnect from "./config/dbConnect.js";
import { v2 } from 'cloudinary'

// Load environment variables from .env file
config();

const PORT =5000;
await dbConnect()

v2.config({
    cloud_name:"da73zvmj8",
    api_key:"893414633941324",
    api_secret:"dR1WRHEWZ3bq_McRLtDEbFvW07c"
})


const server = http.createServer(app);

server.listen(PORT, async () => {

 console.log(`Server is running at ${PORT}`);
});
