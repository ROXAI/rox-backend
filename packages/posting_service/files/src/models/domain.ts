import { Document, ObjectId } from "mongoose";
import {
  AdPromotionContent,
  Product,
  Profile,
  Service,
  UserBusiness,
  UserBusinessArticles,
} from "../types/interface/business-data";

export interface IFBUser extends Document {
  profileId: ObjectId;
  userId: string;
  accessToken: string;
}

export interface ISocialMediaAccounts extends Document {
  facebook: ObjectId;
  twitter: ObjectId;
}

export interface IProfile extends Document, Profile {}

export interface IProduct extends Document, Product {}

export interface IService extends Document, Service {}

export interface IUserBusiness extends Document, UserBusiness {}

export interface IUserBusinessArticles extends Document, UserBusinessArticles {}
export interface IAdPromotionContent extends Document, AdPromotionContent {}