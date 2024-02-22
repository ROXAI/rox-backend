import { connect, set } from "mongoose";
import "dotenv/config";
set("strictQuery", false);

export function connectDB() {
  const mongoUri = process.env.MONGO_URI!;
  connect(mongoUri)
    .then(() => console.info("connected to mongoDB"))
    .catch((err) => console.error("mongo error", err.message));
}
