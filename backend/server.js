import express from "express";
import response from "express/lib/response.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import postgres from "postgres";

// Must use .js at end since type: "module" in package.json
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log(PORT);

app.use(express.json());
app.use(cors()); 
app.use(helmet());
app.use(morgan("dev")) //log the request

// apply arcjet rate limit to all routes

app.use(async (req, res, next) => {
  try {
    const decision = await aj.protect(req, {
      requested : 1 // specifies that each request consumes 1 token
    });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        res.status(429).json({
          error: "Too many requests"
        });
      } else if (decision.reason.isBot()) {
        res.status(403).json ({
          error: "Bot access denied"
        });
      } else {
        res.status(403).json({error: "Forbidden"});
        }
        return;
      }

      // check for spoofed bot (bot trying to appear like it is not a bot)
      if(decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
        res.status(403).json ({ error: "Spoofed bot detected"});
        return;
      }

      // Below means 'call the next function', which is to hit any of the routes they wish
      next();
    } catch (error) {
    console.log("Arcjet Error", error);
    next(error);
  }
});

// api.get() does not work here for some reason; probably because you are setting the root route for other routes
app.use("/api/products", productRoutes)

// initialize a database if not already created
// For GroupThat, SERIAL will be a long, unique generated value
async function initDB() {
  try{
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `;
    console.log("Table 'products' initialized successfully");
  } catch (error) {
    console.log("Error initDB", error)
  }
}

app.get("/test", (req, res) => {
  res.send("Hello from Test")
})


initDB().then(() => {
// Check package.json scripts
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
})
