import { Router } from "express";
import { clearCart, getCart, updateCart } from "../controller/cartController";

const router = Router();

router.post("/", updateCart);
router.get("/:customerId", getCart);
router.delete("/", clearCart);

export default router;
