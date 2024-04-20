import { errorHandler } from "../../helpers/errorHandler";
import { UserBusinessProductsModel } from "../../models/schema";
import { CustomRequest } from "../../types";
import type { Response } from "express";

export const products = async (req: CustomRequest, res: Response) => {
  try {
    const businessProfileId = req.user?.businessProfileId;

    if (!businessProfileId)
      throw {
        code: "business-id-not-found",
        message: "userBusinessId is required as a query params",
      };

    const data = await UserBusinessProductsModel.find({ businessProfileId })
      .limit(10)
      .lean();

    return res.status(200).json({ data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
