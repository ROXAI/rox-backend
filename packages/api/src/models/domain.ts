import { Document, ObjectId } from "mongoose";
import {
  AdPromotionContent,
  Product,
  Profile,
  Service,
  UserBusiness,
  UserBusinessArticles,
} from "../types/interface/business-data";

interface tokenManager {
  accessToken: string;
  exp: number;
  isValid: boolean;
}

export interface IFBUser extends Document {
  businessProfileId: ObjectId;
  userId: string;
  tokenManager: tokenManager;
  isConnected: boolean;
}

export interface ISocialMediaAccounts extends Document {
  facebook: ObjectId;
  instagram: ObjectId;
  twitter: ObjectId;
}

export interface IProfile extends Document, Profile {}

export interface IProduct extends Document, Product {}

export interface IService extends Document, Service {}

export interface IUserBusiness extends Document, UserBusiness {}

export interface IUserBusinessArticles extends Document, UserBusinessArticles {}
export interface IAdPromotionContent extends Document, AdPromotionContent {}
