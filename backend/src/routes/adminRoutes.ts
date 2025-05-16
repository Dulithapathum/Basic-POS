import { Router } from "express";
import { adminLogin, adminRegister } from "../controller/adminsController";

const router = Router();

router.post("/register", adminRegister);
router.post("/login", adminLogin);

export default router;
