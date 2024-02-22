import express from "express";
import { generateTextContent } from "../../controllers/content_management/create-content";
import { FBAuth } from "../../middlewares/gatekeeper";
import { EditAdContent } from "../../controllers/content_management/edit-content";
import { removeAdContent } from "../../controllers/content_management/remove-content";
import { getAds } from "../../controllers/content_management/get-ads";
import { SelectedAd } from "../../controllers/content_management/selectAd";
import { getSelectedAds } from "../../controllers/content_management/get-selected-ads";

export const router = express.Router();
router.post("/generate-text-content", FBAuth, generateTextContent);
router.post("/edit-ad-content", FBAuth, EditAdContent);
router.post("/remove-ad-content", FBAuth, removeAdContent);
router.post("/add-selected-ad", FBAuth, SelectedAd);
router.get("/get-ads", FBAuth, getAds);
router.get("/get-selected-ads", FBAuth, getSelectedAds);
