import { Response } from "express";
import { errorHandler } from "../../helpers/errorHandler";
import { CustomRequest } from "../../types";
import { UserBusinessQuery } from "../../models/query-operations/user-business";
import { convertToObjectId } from "../../utils/convert-to-objectid";

export const BusinessDataOne = async (req: CustomRequest, res: Response) => {
  try {
    const { findOne } = new UserBusinessQuery();
    const id = req.query?.id;
    const businessData = await findOne({
      _id: convertToObjectId(id as string) as any,
    });
    res.status(200).json({ data: businessData });
  } catch (error: any) {
    await errorHandler(error, res);
  }
};
