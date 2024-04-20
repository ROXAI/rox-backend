import express from "express";
import { createAccount } from "../../controllers/user_account/create-account";
import { signUp } from "../../controllers/user_account/sign-up";
import { Login } from "../../controllers/user_account/login";
import { verifyEmail } from "../../controllers/user_account/verify-email";
import { FBAuth } from "../../middlewares/gatekeeper";
import { refreshToken } from "../../controllers/user_account/refresh-token";
import { currentUser } from "../../controllers/user_account/get-current-user";
export const router = express.Router();

router.post("/create-account", createAccount);
router.post("/sign-up", signUp);
router.post("/login", Login);

router.get("/refreshtoken", refreshToken);
router.get("/verify-email", FBAuth, verifyEmail);
router.get("/userProfile", FBAuth, currentUser);