import { Response } from "express";
import { IService } from "../../models/domain";
import { CustomRequest } from "../../types";
import { validateObjectFields } from "../../utils/input-validation/user-business";
import { UserBusinessServiceModel } from "../../models/schema";
import { errorHandler } from "../../helpers/errorHandler";

interface requestData extends IService {
  _id: string;
}
export const updateService = async (req: CustomRequest, res: Response) => {
  try {
    const requestData: requestData = req.body;
    if (!requestData?._id)
      throw {
        code: "product-id-not-found",
        message: "product id is required",
      };
    const product = await UserBusinessServiceModel.findByIdAndUpdate(
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
