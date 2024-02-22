import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDB } from "./models";
import { FBUserDetailsRoute } from "./routes/facebook";
import { router as FBPagePostAutomationRoute } from "./routes/cron/facebook";
import { router as userAccountRoute } from "./routes/userAccount";
import { router as contentRoute } from "./routes/content_manager";
import { router as businessRoute } from "./routes/user_business";
import { router as instagramRoute } from "./routes/social_accounts/instagram";
import { FBAuth } from "./middlewares/gatekeeper";

export const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).json({ data: "data" });
});

app.use("/api/v1/facebook/auth", FBUserDetailsRoute);
app.use("/api/v1/automation/fb", FBPagePostAutomationRoute);
app.use("/api/v1/account", userAccountRoute);
app.use("/api/v1/business", businessRoute);
app.use("/api/v1/content", contentRoute);
app.use("/api/v1/social_accounts/instagram", FBAuth, instagramRoute);

const PORT = 4000;
app.listen(PORT, () => console.log("server running on port:", PORT));
