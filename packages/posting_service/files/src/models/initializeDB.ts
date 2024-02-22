import "dotenv/config";
import { connect, set, disconnect } from "mongoose";
set("strictQuery", false);

export const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI!;
  await connect(mongoUri);
  console.log("Connected to MongoDB");
};

export const disconnectDB = async () => {
  await disconnect();
  console.log("Disconnected from MongoDB");
};
