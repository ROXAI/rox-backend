import { Response } from "express";
import { validateObjectFields } from "../../utils/input-validation/user-business";
import { errorHandler } from "../../helpers/errorHandler";
import { UserBusiness } from "../../models/schema";

import { CustomRequest } from "../../types";
import { UserProfileQuery } from "../../models";
import { ManageSessionCache } from "../../helpers/manage-session-cache";

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
    const { addBusinessIdToCache } = new ManageSessionCache(
      req.user?.profileId!
    );
    await addBusinessIdToCache(data._id);
    res.status(200).json({ data });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
