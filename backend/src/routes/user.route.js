import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

export default router;