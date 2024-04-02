import { Document, ObjectId } from "mongoose";
import {
  AdPromotionContent,
  Product,
  Profile,
  Service,
  BusinessProfile,
  UserBusinessArticles,
} from "../types/interface/business-data";
import {
  FBUserField,
  tokenManager,
  FBPage,
} from "../types/interface/social-accounts";

export interface ItokenManager extends tokenManager {}

export interface IFBPage extends FBPage {}

export interface IFBUser extends FBUserField, Document {}

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
