import { Router } from "express";
import { addCustomer } from "../controller/customerController";

const router = Router();

router.post("/add", addCustomer);

export default router;
