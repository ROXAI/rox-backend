import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { UserProfileQuery } from "../../models";

export const currentUser = async (req: CustomRequest, res: Response) => {
  try {
    const { findOne } = new UserProfileQuery();
    const userProfile = await findOne({ _id: req.user?.profileId });
    return res.status(200).json({ data: userProfile });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
