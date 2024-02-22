import express from "express";
import { automateFBPost } from "../../../controllers/cronJob/automateFBPagePost";

export const router = express.Router();

router.route("/fb-page-post").get(automateFBPost);
