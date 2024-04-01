import { Response } from "express";
import { CustomRequest } from "../../../types";
import { errorHandler } from "../../../helpers/errorHandler";
import { FBUserModel } from "../../../models/schema";

export const getFacebookAccount = async (req: CustomRequest, res: Response) => {
  const businessProfileId = req.user?.businessProfileId;
  if (!businessProfileId)
    throw new Error("businessProfileId was not provided on the server");

  try {
    const data = await FBUserModel.findOne({
      businessProfileId: businessProfileId,
    }).lean();
    return res.status(200).json({ data: data });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
