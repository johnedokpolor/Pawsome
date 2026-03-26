import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/route.js";
import { initDB } from "./config/db.js";
import { rateLimiter } from "./lib/arcjet.js";
import { seedDatabase } from "./seeds/product.js";
import path from "path";

const port = process.env.PORT;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
); // Helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // Morgan logs the request to the console
app.use(rateLimiter); // Apply arcjet rate limit to all routes

app.use("/api/products", routes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get((req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

initDB().then(() => {
  app.listen(port, () => {
    console.log("Server is active on port " + port);
  });
});

// seedDatabase();
