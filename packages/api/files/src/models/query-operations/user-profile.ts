import { ProfileModel } from "../schema";

interface FilterQuery {
  email: string;
  uid: string;
  _id: string;
}

export class UserProfileQuery {
  findOne = async (filter: Partial<FilterQuery>, options?: any) => {
    return ProfileModel.findOne(filter, options);
  };
}
