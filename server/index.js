import "dotenv/config";
import { connectDB } from "./src/config/db.config.js";
import app from "./src/app.js";
import { envConfig } from "./src/config/environment.config.js";

connectDB().then(() => {
  app.listen(envConfig.PORT, () => {
    console.log("Server is running on port: ", envConfig.PORT);
  });
});
