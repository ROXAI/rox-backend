import { AdPropmotionContentEntry } from "../models/schema";
import { adContentStatus } from "../types/enums";
import { AdPromotionContent } from "../types/interface/business-data";

export const postContentToSocialMedia = async (
  data: AdPromotionContent & { _id: string }
) => {
  try {
    // posting successfull
    await AdPropmotionContentEntry.findByIdAndUpdate(data._id, {
      $set: { status: adContentStatus.POSTED },
    });
  } catch (error: any) {
    console.log("POSTED_SHEDULE_ERROR", error?.message);
  }
};
