import { Response } from "express";
import { IGUserModel } from "../../../models/schema";
import { ManageSessionCache } from "../../../helpers/manage-session-cache";
import { CustomRequest } from "../../../types";
import { IGUserSchemaInput } from "../../../utils/input-validation";
import { errorHandler } from "../../../helpers/errorHandler";

export const createInstagramAccount = async (
  req: CustomRequest,
  res: Response
) => {

  const userData = req.body as typeof IGUserSchemaInput.shape;
  const buinsessId = req.user?.businessId!;

  const IGUser = {
    userId: userData.userId,
    userBusinessId: buinsessId,
    tokenManager: {
      accessToken: userData.accessToken,
    },
  };

  try {
    const data: typeof IGUser = await IGUserModel.create(IGUser);
    res.status(200).json({ data });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
