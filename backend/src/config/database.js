import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const db = await mongoose.connect(
            `${process.env.MONGODB_URI}`
        )
        console.log(`Connected to the database! ${db.connection.host}`);

    } catch (error) {
        console.log("Connection failed:", error);
        process.exit(1);
    }
}

export default connectDB;