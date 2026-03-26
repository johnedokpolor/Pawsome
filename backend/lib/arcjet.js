import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import "dotenv/config";

// init arcjet
export const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }), // shiled protects your app from common attacks e.g SQL injection, XSS, CSRf attacks
    detectBot({
      mode: "LIVE", // block all bots except search engines
      allow: [
        "CATEGORY:SEARCH_ENGINE", // see the full list at https://arcjet.com/bot-list
      ],
    }),
    // rate limiting
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // after 10 seconds, 5 tokens gets refilled
      interval: 10, // 10 seconds interval
      capacity: 10, // 10 tokens capacity
    }),
  ],
});

export const rateLimiter = async (req, res, next) => {
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
};
