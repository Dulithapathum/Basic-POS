import { Router } from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controller/productController";
import { verifyAdmin } from "../middleware/auth";

const router = Router();

router.post("/", verifyAdmin, addProducts);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
