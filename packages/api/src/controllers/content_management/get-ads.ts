import { Response } from "express";
import { AdPropmotionContentEntry } from "../../models/schema";
import { CustomRequest } from "../../types";
import { convertToObjectId } from "../../utils/convert-to-objectid";
import { errorHandler } from "../../helpers/errorHandler";

export const getAds = async (req: CustomRequest, res: Response) => {
  try {
      const adId = req.query._id as string;
    const ads = await AdPropmotionContentEntry.find({
      businessId: convertToObjectId(adId),
    }).limit(10);
    res.status(200).json({ data: ads });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
