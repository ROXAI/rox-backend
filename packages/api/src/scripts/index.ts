import { connectDB } from "../models";
import { populate } from "./populateDB";
connectDB();
populate()