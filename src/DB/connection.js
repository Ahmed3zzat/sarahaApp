import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Use the CONNECTION_URI environment variable to connect to the database
    await mongoose.connect(process.env.URI_ONLINE);
    console.log("Connected to the database successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
export default connectDB;
