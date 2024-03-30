import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { OnboardBusinessData } from "../../helpers/onboard-business-data";

export const onboardBusinessData = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const profileId = req.user?.profileId || "";
    const businessProfileId = req.user?.businessProfileId || "";
    const { onboardData } = new OnboardBusinessData(profileId, businessProfileId);
    const data = await onboardData();
    return res.status(200).json({ data: data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
