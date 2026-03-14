import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config";
import routes from "./routes/route.js";
import { initDB } from "./config/db.js";
import { aj } from "./lib/arcjet.js";

const port = process.env.PORT;
const app = express();
console.log("port", port);

app.use(express.json());
app.use(cors());
app.use(helmet()); // Helmet is a security middleware that helps you protect your app by setting various HTTP headers
app.use(morgan("dev")); // Morgan logs the request to the console
app.use(async (req, res, next) => {
  try {
    const decison = await aj.protect(req, {
      requested: 1, // specifies tha each request consumes 1 token
    });
    if (decison.isDenied()) {
      if (decison.reason.isRateLimit()) {
        res.status(429).json({
          error: "Too Many Requests",
        });
      } else if (decison.reason.isBot()) {
        res.status(403).json({
          error: "Bot access denied",
        });
      } else {
        res.status(403).json({
          error: "Forbidden",
        });
      }
      return;
    }
    // check for spoofed bots
    if (
      decison.results.some(
        (result) => result.reason.isBot() && result.reason.isSpoofed(),
      )
    ) {
      res.status(403).json({ error: "Spoofed bot detected" });
      return;
    }
    next();
  } catch (err) {
    console.log("Arcjet error", err);
  }
}); // Apply arcjet rate limit to all routes

app.use("/api/products", routes);

initDB().then(() => {
  app.listen(port, () => {
    console.log("Server is active on port " + port);
  });
});
