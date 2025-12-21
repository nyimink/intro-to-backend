import { Router } from "express";
import { getAllUsers, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";

const router = Router();


router.get("", getAllUsers);
router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

export default router;