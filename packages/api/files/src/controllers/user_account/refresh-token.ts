import { Response } from "express";
import { Auth, CustomRequest } from "../../types";
import { FirebaseAuth } from "../../services/firebase";
import { errorHandler } from "../../helpers/errorHandler";

export const refreshToken = async (req: CustomRequest, res: Response) => {
  try {
    const uid = req.query?.uid;
    const { verifyRefreshToken } = new FirebaseAuth();
    const newIdToken = await verifyRefreshToken(uid as string);
    res.status(200).json({ data: { accessToken: newIdToken } });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
