import { FBUserModel } from "../../models/schema";
import { Request, Response } from "express";

export const UserAuthDetails = async (req: Request, res: Response) => {
  const { userId, accessToken } = req.body;
  try {
    const userExist = await FBUserModel.findOne({ userId });
    if (userExist) {
      await FBUserModel.updateOne(
        { _id: userExist._id },
        {
          $set: { userId, accessToken },
        }
      );
    } else await FBUserModel.create({ userId, accessToken });
    return res.status(200).json({ data: "successful" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
