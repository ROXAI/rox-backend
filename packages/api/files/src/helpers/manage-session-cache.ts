import { SessionCacheEntry } from "../models/schema";

interface sessionCache {
  profileId: string;
  businessProfileId: string;
}
export class ManageSessionCache {
  protected profileId: string;

  constructor(profileId: string) {
    this.profileId = profileId;
  }

  addBusinessIdToCache = async (businessProfileId: string) => {
    return await SessionCacheEntry.findOneAndUpdate(
      { profileId: this.profileId },
      {
        $set: { businessProfileId: businessProfileId },
      },
      { upsert: true, new: true }
    );
  };

  getSessionCache = async () => {
    return (await SessionCacheEntry.findOne({
      profileId: this.profileId,
    }).lean()) as sessionCache;
  };
}
