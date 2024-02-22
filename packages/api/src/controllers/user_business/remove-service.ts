import { Response } from "express";
import { CustomRequest } from "../../types";
import { errorHandler } from "../../helpers/errorHandler";
import { UserBusinessServiceModel } from "../../models/schema";

export const removeService = async (req: CustomRequest, res: Response) => {
  try {
    const id = req.query?.serviceId;
    if (!id)
      throw {
        code: "invalid-id-queryParam",
        message: "id queryParam is missing",
      };
    const data = await UserBusinessServiceModel.findByIdAndDelete(id);
    return res.status(200).json({ data: data });
  } catch (error: any) {
    return await errorHandler(error, res);
  }
};
