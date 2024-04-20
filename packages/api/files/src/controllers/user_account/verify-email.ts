import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { AWSEmailService } from "../../services/aws";
import { isEmailVerified } from "../../utils/user-validation";
import { FirebaseAuth } from "../../services/firebase";

export const verifyEmail = async (req: CustomRequest, res: Response) => {
  const user = req.user;
  const { getVerifyEmailLink } = new FirebaseAuth();
  try {
    isEmailVerified(user!);
    const emailVerificationLink = await getVerifyEmailLink(user?.email!);
    const { sendEmailNotification } = new AWSEmailService();
    await sendEmailNotification(
      "email verification",
      emailVerificationLink,
      user?.email!
    );

    res.status(200).json({ data: "SUCCESSFUL" });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
