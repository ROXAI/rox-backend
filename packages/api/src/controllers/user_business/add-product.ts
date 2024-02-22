import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { IProduct } from "../../models/domain";
import { UserBusinessProductsModel } from "../../models/schema";

interface requestData extends IProduct {}
export const addProduct = async (req: CustomRequest, res: Response) => {
  try {
    const reqData: requestData = req.body;
    if (!reqData._id || reqData._id) delete reqData._id;
    const product = await UserBusinessProductsModel.create(reqData);
    res.status(200).json({ data: product });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
