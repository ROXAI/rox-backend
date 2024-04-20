import { Response } from "express";
import { IGUserModel } from "../../../models/schema";
import { CustomRequest } from "../../../types";
import { IGUserSchemaInput } from "../../../utils/input-validation";
import { errorHandler } from "../../../helpers/errorHandler";

export const createInstagramAccount = async (
  req: CustomRequest,
  res: Response
) => {
  const userData = req.body as typeof IGUserSchemaInput.shape;
  const businessProfileId = req.user?.businessProfileId!;

  const IGUser = {
    userId: userData.userId,
    businessProfileId: businessProfileId,
    isConnected: true,
    tokenManager: {
      accessToken: userData.accessToken,
      exp: userData.exp,
    },
  };

  try {
    const data = await IGUserModel.findOneAndUpdate(
      {
        businessProfileId: businessProfileId,
      },
      {
        $set: IGUser,
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
