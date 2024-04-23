import { Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { ProcessArticle } from "../../helpers/process-article";
import { GenerateAdDependencyDataType } from "../../types/interface/content-generation-data";
import { CustomRequest } from "../../types";

export const generateTextContent = async (
  req: CustomRequest,
  res: Response
) => {
  let userId = req.user?.profileId!;
  const businessProfileId = req.user?.businessProfileId!;
  const requestData = req.body as GenerateAdDependencyDataType;
  const {
    getNotExtractedArticles,
    getArticlesFromJSONAPI,
    generateAdPromosionText,
    stockDBwithArticles,
  } = new ProcessArticle(userId, businessProfileId, requestData);

  try {
    const processArticles = async (nextPageToken: number): Promise<any> => {
      if (!businessProfileId)
        throw new Error("businessProfileId was not provided on the server");
      const businessArticle = await getNotExtractedArticles();

      if (!businessArticle) {
        const data = await getArticlesFromJSONAPI(nextPageToken);
        const startIndex = data.queries?.nextPage[0]?.startIndex;
        console.log("====================================");
        console.log("businessArticle");
        console.log("====================================");
        const result = await stockDBwithArticles(startIndex);
        if (!result) return await processArticles(startIndex);
        const adPropmotion = await generateAdPromosionText();
        return res.status(200).json({ data: adPropmotion });
      }
      //when article is not empty
      const adPropmotion = await generateAdPromosionText();
      return res.status(200).json({ data: adPropmotion });
    };

    await processArticles(1);
  } catch (error: any) {
    errorHandler(error, res);
  }
};
