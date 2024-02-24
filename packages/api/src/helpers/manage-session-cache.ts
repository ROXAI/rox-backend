import { SessionCacheEntry } from "../models/schema";

export class ManageSessionCache {
  protected profileId: string;

  constructor(profileId: string) {
    this.profileId = profileId;
  }

  addBusinessIdToCache = async (businessId: string) => {
    return await SessionCacheEntry.findOneAndUpdate(
      { profileId: this.profileId },
      {
        $set: { userBusinessId: businessId },
      },
      { upsert: true, new: true }
    );
  };
}
