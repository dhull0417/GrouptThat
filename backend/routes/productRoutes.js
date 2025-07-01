import expres from "express";
import { deleteProduct, getProduct, getProducts, updateProduct, createProduct  } from "../controllers/productController.js";


const router = expres.Router();

router.get("/", getProducts)
// :id is meant to identify which product to get from all other products using id in sql tableS
// Could use this for group in real app.
router.get("/:id", getProduct)
// post method creates a new product
router.post("/", createProduct)
// put method updates/modifies product
router.put("/:id", updateProduct)
// delete method obviously deletes
router.delete("/:id", deleteProduct)

export default router;