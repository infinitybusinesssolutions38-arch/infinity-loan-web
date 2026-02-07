import mongoose from "mongoose";

const globalWithMongoose = global;
const cached = globalWithMongoose.__mongoose || { conn: null, promise: null };

const connectDB = async () => {
    if (cached.conn) return cached.conn;

    if (!process.env.CONNECTIONSTRING) {
        throw new Error("Missing CONNECTIONSTRING environment variable");
    }

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(process.env.CONNECTIONSTRING, {
                bufferCommands: false,
            })
            .then((mongooseInstance) => mongooseInstance);
    }

    try {
        cached.conn = await cached.promise;
        globalWithMongoose.__mongoose = cached;
        return cached.conn;
    } catch (error) {
        cached.promise = null;
        throw error;
    }
};

export default connectDB;