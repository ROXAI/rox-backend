import express from "express";
import { UserAuthDetails } from "../../controllers/facebookAuth/store-auth-detail";
export const router = express.Router();

router.route("/").post(UserAuthDetails);
