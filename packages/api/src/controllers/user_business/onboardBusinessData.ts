import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { UserBusiness } from "../../models/schema";

export const onboardBusinessData = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const documents = await UserBusiness.find({
      profileId: req.user?.profileId,
    }).sort({ createdAt: -1 });

    if (documents.length === 0)
      throw {
        code: "nofound",
        message: "business profile is empty",
      };

    const firstDocument = await documents[0].populate({
      path: "profileId",
      select: ["email"],
    });

    const subsequentFieldValues = documents.map(({ businessName, _id }) => ({
      _id,
      businessName,
    }));
    const data = {
      currentSelection: firstDocument,
      businessInfoData: subsequentFieldValues,
    };
    return res.status(200).json({ data: data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
