import { ObjectId } from "mongoose";
import { adContentStatus } from "../enum";

export interface Profile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  socialMediaAccounts: {
    facebook: ObjectId;
    twitter: ObjectId;
  };
}

export interface Product {
  businessProfileId: ObjectId;
  name: string;
  description: string;
  categories: string[];
  subCategories: string[];
}

export interface Service extends Product {}

export interface UserBusiness {
  profileId: ObjectId;
  businessName: string;
  description: string;
  additionalDetails: string;
  queryString: string;
  postingStatus: "STANDARD" | "PREMIUM" | "NONE";
}

interface adContent {
  _id?: ObjectId;
  text: string;
}

export interface UserBusinessArticles {
  businessProfileId: ObjectId;
  title: string;
  link: string;
  extracted: boolean;
  adPromotionContent: adContent[];
}

export interface AdPromotionContent {
  status: adContentStatus;
  text: string;
  sourceArticle: ObjectId;
  businessProfileId: ObjectId;
}
