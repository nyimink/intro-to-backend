import mongoose from "mongoose";
import { Post } from "../models/post.model.js";

const createPost = async (req, res) => {
    try {
        const {name, description, age, userId} = req.body;

        if(!name || !description || !age || !userId) {
            return res.status(400).json({
                message: "All fields are required."
            });
        }

        const post = await Post.create({
            name, 
            description, 
            age, 
            user: userId
        });

        return res.status(201).json({
            message: "A post uploaded.",
            post
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();

        return res.status(200).json(posts);


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const getPostByUser = async (req, res) => {
    try {
        const { userId } = req.params;

        const posts = await Post
                        .find({ user: userId })
                        .populate("user", "username email");

        return res.status(200).json(posts);


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {

        const id  = req.params.id;

        //validating id coming from request is valid or not!
        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ 
                message: "Invalid Record ID" 
            });
        }

        if(Object.keys(req.body).length === 0) {
            return res.status(400).json({
                message: "No data provided."
            });
        }

        const post = await Post.findByIdAndUpdate(
            id,         //mongoose automatically converts string to ObjectId
            req.body,
            {new: true}
        );

        if(!post) return res.status(404).json({
            message: "Post not found."
        });

        return res.status(200).json({
            message: "A post is updated successfully.",
            post
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    } 
}

const deletePost = async (req, res) => {
    try {
        const id = req.params.id;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid Record ID."
            });
        }

        const post = await Post.findByIdAndDelete(id);

        if(!post) return res.status(404).json({
            message: "Post Not Found."
        });

        return res.status(200).json({
            message: "A post is deleted successfully.",
            post
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    } 
}

export {createPost, getPosts, getPostByUser, updatePost, deletePost}