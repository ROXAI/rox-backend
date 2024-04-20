import { Request, Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { FirebaseAuth } from "../../services/firebase";
import { AWSEmailService } from "../../services/aws";
import { UserProfileQuery } from "../../models";
import { UserProfileMutation } from "../../models";

import { LoginOutPut } from "../../types";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { email, firstName, password } = req.body;
    if (!firstName) throw new Error("Name is required");

    const { createUser, getVerifyEmailLink, loginUser } = new FirebaseAuth();
    const { sendEmailNotification } = new AWSEmailService();
    const { findOne } = new UserProfileQuery();
    const { addUser } = new UserProfileMutation();

    const userProfile = await findOne({ email });
    if (userProfile)
      throw { code: "USER_ALREADY_EXISTS", message: "user already exist" };

    const user = await createUser(email, password);
    const emailVerificationLink = await getVerifyEmailLink(user.email!);

    await addUser({ email, firstName, uid: user.uid });
    await sendEmailNotification(
      "email verification",
      emailVerificationLink,
      user?.email!
    );

    const loginDetails = await loginUser(email, password);
    const tokenData = await loginDetails.user.getIdTokenResult();
    const loginData: LoginOutPut = {
      uid: user.uid,
      email: user.email || "",
      email_verified: loginDetails.user.emailVerified,
      refreshToken: loginDetails.user.refreshToken,
      accessToken: tokenData.token,
      exp: parseInt(tokenData.claims.exp!) || 0,
    };

    res.status(200).json({ data: loginData });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
