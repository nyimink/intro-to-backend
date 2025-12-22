import { Router } from "express";
import { createPost, getPosts, getPostByUser, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.post("/create", createPost);

router.get("", getPosts);
router.get("/user/:userId", getPostByUser);

router.patch("/update/:id", updatePost);

router.delete("/delete/:id", deletePost);

export default router;