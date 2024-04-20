import { ObjectId } from "mongoose";

export interface tokenManager {
  accessToken: string;
  exp: number;
  isValid: boolean;
}
export interface FBPage {
  id: string;
  name: string;
  access_token: string;
}
export interface FBUserField {
  businessProfileId: ObjectId;
  userId: string;
  tokenManager: tokenManager;
  isConnected: boolean;
  page: FBPage;
}
