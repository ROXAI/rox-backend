import { Response, NextFunction } from "express";
import { FirebaseAuth } from "../services/firebase";
import { errorHandler } from "../helpers/errorHandler";
import { CustomRequest } from "../types";
import { UserProfileQuery } from "../models";

const { verifyIdToken } = new FirebaseAuth();

export const FBAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization || "";
    if (!token)
      throw {
        code: "unathorized",
        message: "user is not logged in",
      };
    const user = await verifyIdToken(token);
    const { findOne } = new UserProfileQuery();
    const userProfile = await findOne({ uid: user?.uid });
    if (!user)
      throw {
        code: "unathorized",
        message: "invalid credentials",
      };
    req.user = { ...user, profileId: userProfile?._id } as any;
    next();
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
