import { Schema, model, models } from "mongoose";
import {
  IAdPromotionContent,
  IFBUser,
  IProduct,
  IProfile,
  IService,
  ISocialMediaAccounts,
  IUserBusiness,
  IUserBusinessArticles,
} from "./domain";
import { adContentStatus, postingStatus } from "../types/enum";

const ObjectId = Schema.Types.ObjectId;

const FBUser = new Schema<IFBUser>(
  {
    profileId: { type: ObjectId, required: true },
    userId: { type: String, required: true },
    accessToken: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const socialMediaAccountsSchema = new Schema<ISocialMediaAccounts>({
  facebook: { type: ObjectId, ref: "FBUser" },
  twitter: { type: ObjectId },
});

export const ProfileSchema = new Schema<IProfile>(
  {
    uid: { type: String, required: true }, //index
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    socialMediaAccounts: socialMediaAccountsSchema,
  },
  {
    timestamps: true,
  }
);

const BusinessProduct = new Schema<IProduct>(
  {
    userBusinessId: { type: ObjectId, ref: "UserBusiness", required: true },
    name: { type: String },
    description: { type: String },
    categories: { type: [String] },
    subCategories: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const BusinessService = new Schema<IService>(
  {
    userBusinessId: { type: ObjectId, ref: "UserBusiness", required: true },
    name: { type: String },
    description: { type: String },
    categories: { type: [String] },
    subCategories: { type: [String] },
  },
  {
    timestamps: true,
  }
);

export const UserBusinessSchema = new Schema<IUserBusiness>(
  {
    profileId: { type: ObjectId, ref: "Profile", required: true },
    businessName: { type: String, required: true }, //index
    description: { type: String, required: false },
    additionalDetails: { type: String },
    queryString: { type: String },
    postingStatus: { type: String, default: postingStatus.NONE },
  },
  {
    timestamps: true,
  }
);

const AdPropmotionContent = new Schema<IAdPromotionContent>(
  {
    sourceArticle: { type: ObjectId, ref: "BusinessArticles" },
    text: { type: String },
    businessId: { type: ObjectId, ref: "UserBusiness" },
    status: { type: "String", default: adContentStatus.DRAFT },
  },
  {
    timestamps: true,
  }
);

const SelectedAd = new Schema({
  ad: { type: ObjectId, ref: "AdPropmotionContent" },
  businessId: { type: ObjectId, ref: "UserBusiness" },
});

const UserBusinessArticleSchema = new Schema<IUserBusinessArticles>(
  {
    businessId: { type: ObjectId, ref: "UserBusiness" },
    title: { type: String, required: true },
    link: { type: String, required: true },
    extracted: { type: Boolean, default: false }, //index
  },
  {
    timestamps: true,
  }
);

export const FBUserModel = models.FBUser || model("FBUser", FBUser);
export const ProfileModel = models.Profile || model("Profile", ProfileSchema);
export const UserBusiness =
  models.UserBusiness || model("UserBusiness", UserBusinessSchema);
export const UserBusinessArticlesModel =
  models.UserBusinessData ||
  model("BusinessArticles", UserBusinessArticleSchema);

export const UserBusinessProductsModel =
  models.UserBusinessProducts || model("BusinessProducts", BusinessProduct);
export const UserBusinessServiceModel =
  models.UserBusinessService || model("BusinessService", BusinessService);
export const AdPropmotionContentEntry =
  models.AdPropmotionContent ||
  model("AdPropmotionContent", AdPropmotionContent);

export const SelectedAdEntry =
  models.SelectedAd || model("SelectedAd", SelectedAd);
