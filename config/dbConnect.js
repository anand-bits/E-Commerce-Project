import mongoose from "mongoose";
import { config } from "dotenv";

mongoose.set('strictQuery', false);
config();

const dbConnect = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB connected to ${connected.connection.host}`);
    } catch (err) {
        console.error(`Error in connecting to the MongoDB database: ${err.message}`);
    }
};

export default dbConnect;
