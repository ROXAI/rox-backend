import { Response } from "express";
export const errorHandler = async (error: any, res: Response) => {
  const data = {
    code: error.code || "nofound",
    message: error.message,
  };
  console.error(error)
  return res.status(500).json({ error: data });
};
