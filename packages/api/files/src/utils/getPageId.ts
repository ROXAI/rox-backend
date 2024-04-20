import axios from "axios";

export const getFaceBookPageId = async (
  user_access_token: string,
  user_id: string
) => {
  return await axios(
    `https://graph.facebook.com/v18.0/${user_id}/accounts?access_token=${user_access_token}`,
    {
      method: "get",
    }
  );
};
