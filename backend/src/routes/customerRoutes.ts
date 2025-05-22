import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getAllCustomer,
  getCustomerById,
} from "../controller/customerController";
import { verifyAdmin } from "../middleware/auth";

const router = Router();

router.post("/", verifyAdmin, addCustomer);
router.delete("/:id", verifyAdmin, deleteCustomer);
router.get("/", getAllCustomer);
router.get("/:id", getCustomerById);

export default router;
