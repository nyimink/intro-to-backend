import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

//hash password before saving
userSchema.pre("save", async function () {  
    //in this line, arrow fun can't be used. if it is used, we can't use "this."

    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password, 10);
})

//compare passwords after hashing
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema)