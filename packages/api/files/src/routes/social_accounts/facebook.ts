import express from "express";
import validateInput from "../../middlewares/input-validator";
import { FBUserSchemaInput } from "../../utils/input-validation";
import { activeUserBusiness } from "../../middlewares/sessionCache";
import { saveFBAccountInfo } from "../../controllers/social_accounts/facebook/create-account";
import { getFacebookAccount } from "../../controllers/social_accounts/facebook/get-account";

export const router = express.Router();
router.post(
  "/createAccount",
  validateInput(FBUserSchemaInput),
  activeUserBusiness,
  saveFBAccountInfo
);
router.get("/getFBAccount", activeUserBusiness, getFacebookAccount);