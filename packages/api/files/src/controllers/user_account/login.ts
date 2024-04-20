import { Request, Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { FirebaseAuth } from "../../services/firebase";
import { Auth, LoginOutPut } from "../../types";

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { loginUser } = new FirebaseAuth();
    const { user } = await loginUser(email, password);
    const tokenData = await user.getIdTokenResult();
    const loginData: LoginOutPut = {
      uid: user.uid,
      email: user.email || "",
      email_verified: user.emailVerified,
      refreshToken: user.refreshToken,
      accessToken: tokenData.token,
      exp: parseInt(tokenData.claims.exp!) || 0,
    };

    res.cookie(Auth.token, loginData?.accessToken, {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60,
    });

    return res.send({ data: loginData });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
