import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
    try {
        
        const { username, email, password } = req.body;

        //basic validation
        if(!username || !email || !password) {
            return res.status(400).json({ alert: "All the fields are required!"});
        }

        //check user existence
        const existence = await User.findOne({ email: email.toLowerCase() });
        if (existence) {
            return res.status(400).json({ message: "User already exists." });
        }

        //creating a user
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false
        });

        return res.status(201).json({
            message: "A user is registered.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

const loginUser = async (req, res) => {
    try {

        //check user registered
        const {email, password} = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if(!user) {
            return res.status(400).json({
                message: "User not registered."
            });
        }

        //check email and password match
        const isMatch = await user.comparePassword(password);
        
        if(!isMatch) return res.status(400).json({
            message: "Email and password don't match."
        });

        return res.status(200).json({
            message: "User Logged In.",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });

    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error.", error: error.message
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const email = req.body;

        const user = await User.findOne(email);

        if(!user) {
            return res.status(404).json({
                message: "User Not Found."
            });
        }

        return res.status(200).json({
            message: "Successfully logout.",
            link: {
                login: `http://localhost:${process.env.PORT}/api/v1/users`
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error.", error: error.message
        });
    }
}

export {registerUser, loginUser, logoutUser}