import express from "express";
import response from "express/lib/response.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import postgres from "postgres";

// Must use .js at end since type: "module" in package.json
import productRoutes from "./routes/productRoutes.js"
import { sql } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

console.log(PORT);

app.use(express.json());
app.use(cors()); 
app.use(helmet());
app.use(morgan("dev")) //log the request

// api.get() does not work here for some reason
app.use("/api/products", productRoutes)

// initialize a database if not already created
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
