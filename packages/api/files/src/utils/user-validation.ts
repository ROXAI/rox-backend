import { User } from "../types";

export const isEmailVerified = (user: User) => {
  if (!user)
    throw {
      code: "user-not-found",
      message: "user object is empty",
    };

  if (user?.email_verified) {
    throw {
      code: "verified",
      message: "email is already verified",
    };
  }
};
