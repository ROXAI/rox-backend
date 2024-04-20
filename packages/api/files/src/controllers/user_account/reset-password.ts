import { Request, Response } from "express";
import { FirebaseAuth } from "../../services/firebase";
import { AWSEmailService } from "../../services/aws";
import { errorHandler } from "../../helpers/errorHandler";

export const passwordReset = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string;
    if (!email)
      throw { code: "email-not-found", message: "email address not found" };

    const { getPasswordResetLink } = new FirebaseAuth();
    const { sendEmailNotification } = new AWSEmailService();
    const passwordResetLink = await getPasswordResetLink(email);

    await sendEmailNotification("reset password", passwordResetLink, email);
    res.status(200).json({ data: "SUCCESSFUL" });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
