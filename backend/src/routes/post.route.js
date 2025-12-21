import { Router } from "express";
import { createPost, getPosts, getPostByUser } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", createPost);
router.get("", getPosts);
router.get("/user/:userId", getPostByUser);

export default router;