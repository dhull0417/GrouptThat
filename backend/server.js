import express from "express";
import response from "express/lib/response.js";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"

// Must use .js at end since type: "module" in package.json
import productRoutes from "../routes/productRoutes.js"

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

app.get("/test", (req, res) => {
  res.send("Hello from Test")
})

// Check package.json scripts
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
