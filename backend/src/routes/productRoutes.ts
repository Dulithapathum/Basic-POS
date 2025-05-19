import { Router } from "express";
import {
  addProducts,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../controller/productController";
import { verifyAdmin } from "../middleware/auth";
import upload from "../middleware/upload";

const router = Router();

router.post("/", upload.single("image"), addProducts);
router.delete("/:id", verifyAdmin, deleteProduct);
router.get("/", getAllProducts);
router.get("/:id", getProductById);

export default router;
