import { Response } from "express";
import { SelectedAdEntry } from "../../models/schema";
import { CustomRequest } from "../../types";
import { convertToObjectId } from "../../utils/convert-to-objectid";
import { errorHandler } from "../../helpers/errorHandler";

export const getSelectedAds = async (req: CustomRequest, res: Response) => {
  try {
    const adId = req.query._id as string;
    const ads = await SelectedAdEntry.find({
      businessId: convertToObjectId(adId),
    }).populate("ad");
    res.status(200).json({ data: ads });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
