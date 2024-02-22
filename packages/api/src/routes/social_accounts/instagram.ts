import express from "express";
import { createInstagramAccount } from "../../controllers/social_accounts/instagram/create-account";
import { getInstagramAccount } from "../../controllers/social_accounts/instagram/get-account";
import { activeUserBusiness } from "../../middlewares/sessionCache";
// import { FBAuth } from "../../middlewares/gatekeeper";

export const router = express.Router();

router.post("/createAccount", createInstagramAccount);
router.get("/getAccount", activeUserBusiness, getInstagramAccount);
