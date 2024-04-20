import { Response } from "express";
import { IProduct } from "../../models/domain";
import { CustomRequest } from "../../types";
import { validateObjectFields } from "../../utils/input-validation/user-business";
import { UserBusinessProductsModel } from "../../models/schema";
import { errorHandler } from "../../helpers/errorHandler";

interface requestData extends IProduct {
  _id: string;
}
export const updateProduct = async (req: CustomRequest, res: Response) => {
  try {
    const requestData: requestData = req.body;
    if (!requestData?._id)
      throw {
        code: "product-id-not-found",
        message: "product id is required",
      };
    const product = await UserBusinessProductsModel.findByIdAndUpdate(
      requestData._id,
      {
        $set: { ...requestData },
      },
      {
        new: true,
      }
    );
    res.status(200).json({ data: product });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
