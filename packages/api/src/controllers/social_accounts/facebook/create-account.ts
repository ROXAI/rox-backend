import { Response } from "express";
import { CustomRequest } from "../../../types";
import { FBUserModel } from "../../../models/schema";
import { errorHandler } from "../../../helpers/errorHandler";

export const saveFBAccountInfo = async (req: CustomRequest, res: Response) => {
  const businessProfileId = req.user?.businessProfileId!;
  const reqData = req.body

  const FBUser = {
    userId: reqData.userId,
    businessProfileId: businessProfileId,
    isConnected: true,
    tokenManager: {
      accessToken: reqData.accessToken,
      exp: reqData.exp,
    },
    page: { ...reqData.page },
  };

  try {
    const data = await FBUserModel.findOneAndUpdate(
      {
        businessProfileId: businessProfileId,
      },
      {
        $set: FBUser,
      },
      {
        upsert: true,
        new: true,
      }
    );
    res.status(200).json({ data });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
