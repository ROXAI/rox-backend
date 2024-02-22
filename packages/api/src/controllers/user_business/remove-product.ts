import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { UserBusinessProductsModel } from "../../models/schema";

export const removeProduct = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.query?.productId;
    if (!id)
      throw {
        code: "invalid-id-queryParam",
        message: "id queryParam is missing",
      };
    const data = await UserBusinessProductsModel.findByIdAndDelete(id);
    return res.status(200).json({ data: data });
  } catch (error: any) {
    return await errorHandler(error, res);
  }
};
