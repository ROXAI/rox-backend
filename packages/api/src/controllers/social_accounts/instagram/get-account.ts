import { errorHandler } from "../../../helpers/errorHandler";
import { IGUserModel } from "../../../models/schema";
import { Response } from "express";
import { CustomRequest } from "../../../types";

export const getInstagramAccount = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const buinsessId = req.user?.businessId;
    const data = await IGUserModel.findOne({
      userBusinessId: buinsessId,
    }).lean();
    return res.status(200).json({ data: data });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
