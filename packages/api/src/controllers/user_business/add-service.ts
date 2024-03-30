import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { IProduct } from "../../models/domain";
import { UserBusinessServiceModel } from "../../models/schema";

interface requestData extends IProduct {}
export const addService = async (req: CustomRequest, res: Response) => {
  try {
    const businessProfileId = req.user?.businessProfileId;
    if (!businessProfileId)
      throw new Error("businessProfileId was not provided on the server");

    const reqData: requestData = { ...req.body, businessProfileId };
    const service = await UserBusinessServiceModel.create(reqData);
    return res.status(200).json({ data: service });
  } catch (error: any) {
    return await errorHandler(error, res);
  }
};
