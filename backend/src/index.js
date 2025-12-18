import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";

import connectDB from "./config/database.js";


const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.log("Error:", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`The server is running on PORT ${process.env.PORT}`)
        })

    } catch (error) {
        console.log("MongoDB connection failed. Error:", error);
    }
}


startServer();