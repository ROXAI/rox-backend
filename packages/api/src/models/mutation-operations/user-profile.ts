import { ProfileModel } from "../schema";

interface FilterQuery {
  email: string;
  _uid: string;
}

export class UserProfileMutation {
  addUser = async (data: any) => {
    return ProfileModel.create(data);
  };
}
