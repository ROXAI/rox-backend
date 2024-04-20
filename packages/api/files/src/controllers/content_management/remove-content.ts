import { Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { CustomRequest } from "../../types";
import { UserBusinessArticlesModel } from "../../models/schema";
import { convertToObjectId } from "../../utils/convert-to-objectid";

export const removeAdContent = async (req: CustomRequest, res: Response) => {
  try {
    const adId = req.body._id;
    const data = await UserBusinessArticlesModel.findByIdAndDelete(convertToObjectId(adId));
    res.status(200).json({ data: data });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
