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

export {createPost, getPosts, getPostByUser}