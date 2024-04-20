import { ManageFBPageResponse } from "../../types";
import { getFaceBookPageId } from "../../utils/getPageId";

export class FacebookPage {
  private FBPageAccessToken: string;
  private FBUserId: string;

  constructor(FBPageAccessToken: string, FBUserId: string) {
    this.FBPageAccessToken = FBPageAccessToken;
    this.FBUserId = FBUserId;
  }

  getPageId = async () => {
    const { data }: { data: ManageFBPageResponse } = await getFaceBookPageId(
      this.FBPageAccessToken,
      this.FBUserId
    );

    return data.data[0];
  };

  createPost = async (data: any) => {
    const getPageIdData = await this.getPageId();
    return await fetch(
      `https://graph.facebook.com/v18.0/${getPageIdData.id}/feed?access_token=${getPageIdData.access_token}`,
      {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };
}
