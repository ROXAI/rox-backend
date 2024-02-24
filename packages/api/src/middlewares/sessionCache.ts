import { errorHandler } from "../helpers/errorHandler";
import { SessionCacheEntry } from "../models/schema";
import { Response, NextFunction } from "express";
import { CustomRequest } from "../types";
import { ManageSessionCache } from "../helpers/manage-session-cache";
export const activeUserBusiness = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const { getSessionCache } = new ManageSessionCache(req.user?.profileId!);
  try {
    const { userBusinessId } = await getSessionCache();
    if (!userBusinessId)
      throw { code: "no-businessId-in-cache", message: "something went wrong" };
    req.user = { ...req?.user!, businessId: userBusinessId };
   return next();
  } catch (error) {
    errorHandler(error, res);
  }
};
