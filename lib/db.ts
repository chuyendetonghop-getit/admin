import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}

const connectDB = async () => {
  // Find the existing connection
  const connectionState = mongoose.connection.readyState;
  console.log("Connection state: ", connectionState);

  if (connectionState === 1) {
    console.log("Already connected to the database");
    return;
  }

  if (connectionState === 2) {
    console.log("Trying to connect...!");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: MONGO_DB_NAME,
      bufferCommands: true,
    });
    console.log("Connected to the database");
  } catch (error: any) {
    console.error("Error connecting to the database: ", error);

    throw new Error("Error connecting to the database", error);
  }
};

export default connectDB;
