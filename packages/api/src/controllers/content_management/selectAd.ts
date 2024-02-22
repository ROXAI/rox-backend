import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { SelectedAdEntry } from "../../models/schema";

interface SelectedAdData {
  businessId: string;
  ad: string;
}
export const SelectedAd = async (req: CustomRequest, res: Response) => {
  try {
    const requestData = req.body as SelectedAdData;
    const data = await SelectedAdEntry.create(requestData);
    return res.status(200).json({ data: data });
  } catch (error: any) {
    errorHandler(error, res);
  }
};
