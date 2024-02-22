import { Request, Response } from "express";
import { ProfileModel } from "../../models/schema";
import { errorHandler } from "../../helpers/errorHandler";
export const createAccount = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) throw new Error("email was not provided");

    const profileExist = await ProfileModel.findOne({ email });
    if (profileExist) throw new Error("user already exist");
    const myProfile = await ProfileModel.create(req.body);
    return res.status(200).json({ data: myProfile });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
