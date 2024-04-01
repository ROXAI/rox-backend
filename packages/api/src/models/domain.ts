import { Document, ObjectId } from "mongoose";
import {
  AdPromotionContent,
  Product,
  Profile,
  Service,
  BusinessProfile,
  UserBusinessArticles,
} from "../types/interface/business-data";

export interface ItokenManager {
  accessToken: string;
  exp: number;
  isValid: boolean;
}

export interface IFBPage {
  id: string;
  name: string;
  access_token: string;
}

export interface IFBUser extends Document {
  businessProfileId: ObjectId;
  userId: string;
  tokenManager: ItokenManager;
  isConnected: boolean;
  page: IFBPage;
}

export interface ISocialMediaAccounts extends Document {
  facebook: ObjectId;
  instagram: ObjectId;
  twitter: ObjectId;
}

export interface IProfile extends Document, Profile {}

export interface IProduct extends Document, Product {}

export interface IService extends Document, Service {}

export interface IBusinessProfile extends Document, BusinessProfile {
  profileId: ObjectId;
}

export interface IUserBusinessArticles extends Document, UserBusinessArticles {}
export interface IAdPromotionContent extends Document, AdPromotionContent {}
