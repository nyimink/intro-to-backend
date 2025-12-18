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

export {registerUser}