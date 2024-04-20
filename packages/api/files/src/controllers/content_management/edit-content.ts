import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { AdPropmotionContentEntry} from "../../models/schema";
import { UserBusinessArticles } from "../../types/interface/business-data";
import { convertToObjectId } from "../../utils/convert-to-objectid";

interface EditAdContentData extends UserBusinessArticles {
  _id: string;
}
export const EditAdContent = async (req: CustomRequest, res: Response) => {
    const data = req.body as EditAdContentData;
    try {
    const response = await AdPropmotionContentEntry.findByIdAndUpdate(
      convertToObjectId(data._id),
      {
        $set: { ...data },
      },
      {
        new: true,
      }
      );
      res.status(200).json({ data: response });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
