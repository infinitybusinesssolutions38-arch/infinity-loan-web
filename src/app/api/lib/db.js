import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const instanceConnections = await mongoose.connect(process.env.CONNECTIONSTRING);
        if (!instanceConnections) {
            console.log("mongondb is not connected");
        }
        else {
            console.log("mongodb is connected succssfully");
        }
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;