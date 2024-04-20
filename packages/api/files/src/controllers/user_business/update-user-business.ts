import { Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { CustomRequest } from "../../types";
import { UserBusiness } from "../../models/schema";
import { convertToObjectId } from "../../utils/convert-to-objectid";

interface RequestData {
  _id: string;
  businessName: string;
  description: string;
}

export const updateUserBusiness = async (req: CustomRequest, res: Response) => {
  try {
    const requestData: RequestData = req.body;
    const businessProfileId = req.user?.businessProfileId;
    if (!businessProfileId)
      throw new Error("businessProfileId was not provided on the server");
    const data = await UserBusiness.findByIdAndUpdate(
      convertToObjectId(businessProfileId),
      {
        $set: { ...requestData },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
