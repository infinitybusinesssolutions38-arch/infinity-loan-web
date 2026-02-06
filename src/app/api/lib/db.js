import mongoose from "mongoose";

const connectDB = async () => {
    const uri =
        process.env.CONNECTIONSTRING ||
        process.env.MONGODB_URI ||
        process.env.MONGO_URI;

    if (!uri) {
        throw new Error(
            "MongoDB connection string is missing. Set CONNECTIONSTRING (or MONGODB_URI) in infinity-loan-web/.env.local"
        );
    }

    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }

    try {
        await mongoose.connect(uri);
        return mongoose.connection;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export default connectDB;