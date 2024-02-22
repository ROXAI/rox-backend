import { errorHandler } from "../helpers/errorHandler";
import { SessionCacheEntry } from "../models/schema";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
export const activeUserBusiness = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: { userBusinessId: string } | null =
      await SessionCacheEntry.findOne({
        profileId: req.user?.profileId,
      }).lean();
    if (!data)
      throw { code: "no-businessId-in-cache", message: "something went wrong" };
    req.user = { ...req?.user!, businessID: data?.userBusinessId! };
    next();
  } catch (error) {
    errorHandler(error, res);
  }
};
