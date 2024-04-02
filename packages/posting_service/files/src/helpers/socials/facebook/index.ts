import { AdPromotionContent } from "../../../types/interface/business-data";
import { FBUserField } from "../../../types/interface/social-accounts";

export const postContentOnFacebook = async (
  fbuser: FBUserField,
  content: AdPromotionContent
) => {
  if (!fbuser.page.id)
    throw {
      code: "FACEBOOK_POSTING_ERROR",
      message: "facebook page user is empty",
    };
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${fbuser.page.id}/feed?access_token=${fbuser.page.access_token}`,
    {
      method: "POST",
      body: JSON.stringify({
        message: content.text,
        published: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const { data, error } = await res.json();
  if (!res.ok) throw error;
  console.log("===posting to facebook page=============");
  console.log(data);
  console.log("====================================");
  return data;
};
