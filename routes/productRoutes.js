import expres from "express";
import { getAllProducts } from "../controllers/productController.js";
import { createProduct } from "../controllers/productController.js";

const router = expres.Router();

router.get("/test", getAllProducts)

router.post("/test", createProduct)

export default router;