import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerById,
} from "../controller/customerController";

const router = Router();

router.post("/add", addCustomer);
router.delete("/:id", deleteCustomer);
router.get("/", getAllCustomer);
router.get("/:id", getCustomerById);

export default router;
