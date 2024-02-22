import { UserBusiness } from "../models/schema";

export class OnboardBusinessData {
  protected profileId: string;
  protected businessId: string;

  constructor(profileId: string, businessId: string) {
    this.profileId = profileId;
    this.businessId = businessId;
  }
  protected getUserBusinesses = async () => {
    return await UserBusiness.find({
      profileId: this.profileId,
    }).sort({ createdAt: -1 });
  };

  onboardData = async () => {
    const lastBusinessActive = await UserBusiness.findById(
      this.businessId
    ).populate({ path: "profileId", select: ["email"] }).lean();
    const documents = await this.getUserBusinesses();
    if (documents.length === 0)
      throw {
        code: "nofound",
        message: "business profile is empty",
      };

    // const firstDocument = await documents[0].populate({
    //   path: "profileId",
    //   select: ["email"],
    // });

    const subsequentFieldValues = documents.map(({ businessName, _id }) => ({
      _id,
      businessName,
    }));
    const data = {
      currentSelection: lastBusinessActive,
      businessInfoData: subsequentFieldValues,
    };

    return data;
  };
}
