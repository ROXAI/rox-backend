import { geUserBusinessAndAdContentBatch } from "./helpers/get-business";
import { postContentToSocialMedia } from "./helpers/post-content";
import { connectDB } from "./models";
import { disconnectDB } from "./models/initializeDB";

import "dotenv/config";
connectDB();
export const handler = async (page = 0): Promise<any> => {
  try {
    const businessAndAdContentData = await geUserBusinessAndAdContentBatch(
      page
    );
    if (businessAndAdContentData.length !== 0) {
      const promises = businessAndAdContentData.map((docs) => {
        if (docs.filteredLookupResult.length === 0)
          return console.log("no more content for", docs._id.toString());

        return postContentToSocialMedia(docs.filteredLookupResult[0]);
      });
      await Promise.all(promises);

      console.log("====================================");
      console.log("recalling handler", page);
      console.log("====================================");
      return handler(page + 1);
    }
    console.log("Successfully posted!");
    await disconnectDB();
    return {
      statusCode: 200,
      body: JSON.stringify("Successfully posted!"),
    };
  } catch (error: any) {
    console.error("Error in Lambda function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify("Internal Server Error" + error.message),
    };
  }
};

handler();
