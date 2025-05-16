import { Router } from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controller/productController";
import { verifyAdmin } from "../middleware/auth";

const router = Router();

router.post("/", addProducts);
router.delete("/:id", deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
