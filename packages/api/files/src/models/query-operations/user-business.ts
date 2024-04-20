import { UserBusiness } from "../schema";
import { Document, ObjectId, Query } from "mongoose";

interface FilterQuery {
  profileId: string;
  uid: string;
  _id: string;
}

export class UserBusinessQuery {
  findOne = async (filter: Partial<FilterQuery>, options?: any) => {
    return await UserBusiness.findOne(filter, options);
  };

  findMany = async (filter: Partial<FilterQuery>, options?: any) => {
    return await UserBusiness.find(filter, options);
  };
}
