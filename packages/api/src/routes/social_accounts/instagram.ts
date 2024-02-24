import express from "express";
import { createInstagramAccount } from "../../controllers/social_accounts/instagram/create-account";
import { getInstagramAccount } from "../../controllers/social_accounts/instagram/get-account";
import { activeUserBusiness } from "../../middlewares/sessionCache";
import validateInput from "../../middlewares/input-validator";
import { IGUserSchemaInput } from "../../utils/input-validation";
// import { FBAuth } from "../../middlewares/gatekeeper";

export const router = express.Router();

router.post(
  "/createAccount",
  validateInput(IGUserSchemaInput),
  activeUserBusiness,
  createInstagramAccount
);
router.get("/getAccount", activeUserBusiness, getInstagramAccount);
