import { AdPropmotionContentEntry } from "../models/schema";
import { adContentStatus } from "../types/enums";
import { AdPromotionContent } from "../types/interface/business-data";
import { FBUserField } from "../types/interface/social-accounts";
import { postContentOnFacebook } from "./socials/facebook";

export const postContentToSocialMedia = async (
  data: AdPromotionContent & { _id: string },
  fbuser: FBUserField
) => {
  try {
    // posting successfull
    await postContentOnFacebook(fbuser, data);
    await AdPropmotionContentEntry.findByIdAndUpdate(data._id, {
      $set: { status: adContentStatus.POSTED },
    });
  } catch (error: any) {
    console.error("POSTED_SHEDULE_ERROR", error);
  }
};
