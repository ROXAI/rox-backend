import { UserBusiness } from "../models/schema";
import { adContentStatus, postingStatus } from "../types/enums";
import { AdPromotionContent } from "../types/interface/business-data";
import { FBUserField } from "../types/interface/social-accounts";

// get businesses that are subscripted for shedule posting

interface BusinessAndAdContentResponse {
  _id: string;
  postingStatus: string;
  filteredLookupResult: (AdPromotionContent & { _id: string })[];
  fbuser: FBUserField[];
}
export const geUserBusinessAndAdContentBatch = async (
  pageNumber = 0
): Promise<BusinessAndAdContentResponse[]> => {
  try {
    const pageLimit = 10;
    const data: BusinessAndAdContentResponse[] = await UserBusiness.aggregate([
      { $match: { postingStatus: postingStatus.STANDARD } },
      { $sort: { _id: 1 } },
      { $skip: pageNumber * pageLimit },
      { $limit: pageLimit },
      {
        $lookup: {
          from: "adpropmotioncontents",
          localField: "_id",
          foreignField: "businessProfileId",
          as: "lookupresult",
        },
      },
      {
        $lookup: {
          from: "fbusers",
          localField: "_id",
          foreignField: "businessProfileId",
          as: "fbuser",
        },
      },
      {
        $addFields: {
          filteredLookupResult: {
            $filter: {
              input: "$lookupresult",
              as: "items",
              cond: { $eq: ["$$items.status", adContentStatus.ACTIVE] },
              limit: 1,
            },
          },
        },
      },
      {
        $project: {
          lookupresult: 0,
          profileId: 0,
          businessName: 0,
          description: 0,
          createdAt: 0,
          updatedAt: 0,
          __v: 0,
        },
      },
    ]).exec();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
