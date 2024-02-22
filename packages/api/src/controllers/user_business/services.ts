import { errorHandler } from "../../helpers/errorHandler";
import { UserBusinessServiceModel } from "../../models/schema";
import { CustomRequest } from "../../types";
import type { Response } from "express";

export const services = async (req: CustomRequest, res: Response) => {
  try {
    const userBusinessId = req.query?.userBusinessId;

    if (!userBusinessId)
      throw {
        code: "business-id-not-found",
        message: "userBusinessId is required as a query params",
      };

    const data = await UserBusinessServiceModel.find({ userBusinessId })
      .limit(10)
      .lean();

    return res.status(200).json({ data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
