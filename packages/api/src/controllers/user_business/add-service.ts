import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { IProduct } from "../../models/domain";
import { UserBusinessServiceModel } from "../../models/schema";

interface requestData extends IProduct {}
export const addService = async (req: CustomRequest, res: Response) => {
  try {
    const reqData: requestData = req.body;
    if (!reqData._id || reqData._id) delete reqData._id;
    const product = await UserBusinessServiceModel.create(reqData);
    return res.status(200).json({ data: product });
  } catch (error: any) {
    return await errorHandler(error, res);
  }
};
