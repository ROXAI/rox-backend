import { Response } from "express";
import { validateObjectFields } from "../../utils/input-validation/user-business";
import { errorHandler } from "../../helpers/errorHandler";
import { ProfileModel, SessionCacheEntry, UserBusiness } from "../../models/schema";
import { convertToObjectId } from "../../utils/convert-to-objectid";
import { ScrappedDataGPTResponse } from "../../helpers/chat-gpt";
import { CustomRequest } from "../../types";
import { UserProfileQuery } from "../../models";

export const businessOverview = async (req: CustomRequest, res: Response) => {
  // const { GCP_API_QueryString } = new ScrappedDataGPTResponse();
  // const businessInfo = JSON.parse(JSON.stringify(req.body));
  // delete businessInfo.businessName;
  try {
    const { findOne } = new UserProfileQuery();
    const { businessName } = req.body;
    if (!validateObjectFields(req.body))
      throw new Error("one or more field is empty");
    const userProfile = await findOne({ uid: req.user?.uid });
    const businessExist = await UserBusiness.findOne({
      businessName: businessName,
      profileId: userProfile?._id,
    });

    if (businessExist)
      throw new Error("businessName already exist for this user");
    // const queryString = await GCP_API_QueryString(JSON.stringify(businessInfo));
    req.body.profileId = userProfile?._id;
    // req.body.queryString = queryString;
    const data = await UserBusiness.create(req.body);
    await SessionCacheEntry.findOneAndUpdate(
      { profileId: req.user?.profileId },
      {
        $set: { userBusinessId: data._id },
      },
      { upsert: true, new: true }
    );
    res.status(200).json({ data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
