import app from "./app/app.js";
import { config } from "dotenv";

try {
  // Load environment variables from .env file
  config();
  
  const PORT = 7000;

  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
} catch (error) {
  console.error('Error during server startup:', error.message);
}
