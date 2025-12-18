import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            minLength: 3,
            maxLength: 30,
            trim: true,
            lowercase: true,
        },
        
        password: {
            type: String,
            required: true,
            minLength: 5,
            maxLength: 40,
        },

        email: {
            type: String,
            unique: true,
            required: true,
            minLength: 3,
            maxLength: 30,
            trim: true,
            lowercase: true,
        }
    },

    {
        timestamps: true,
    }
)

export const User = mongoose.model("User", userSchema)