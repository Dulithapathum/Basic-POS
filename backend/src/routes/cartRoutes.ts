import { Router } from "express";
import { updateCart } from "../controller/cartController";

const router = Router();

router.post("/", updateCart);

export default router;
