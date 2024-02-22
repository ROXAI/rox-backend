import { Request } from "express";

export type User = {
  aud: string;
  uid: string;
  auth_time: number;
  email?: string;
  email_verified?: boolean;
  profileId: string;
  exp: number;
};

export interface CustomRequest extends Request {
  user?: User;
}

export interface TitleAndLink {
  _id?: string;
  title: string;
  link: string;
  summaryStatus?: boolean;
}

export interface FBIUser {
  _id: string;
  userId: string;
  accessToken: string;
}

export interface facebookLoginResponse {
  access_token: string;
  token_type: "bearer";
  expires_in: number;
}

export interface FBAcessTokenInspectResponse {
  data: {
    app_id: string;
    type: string;
    application: string;
    data_access_expires_at: number;
    expires_at: number;
    is_valid: boolean;
    issued_at: number;
    scopes: string[];
    user_id: string;
    granular_scopes: any;
  };
}

export interface FBPageMetaData {
  access_token: string;
  category: string;
  name: string;
  id: string;
  tasks: string[];
}

export interface ManageFBPageResponse {
  data: FBPageMetaData[];
}

export type FBPagePickedProperties = {
  id: string;
  name: string;
};

// _______________________________________________

export interface UserBusiness {
  businessName: string;
  description: string;
  productCategories: {
    name: string;
    subCategories: string[];
  }[];
  serviceCategories: {
    name: string;
    subCategories: string[];
  }[];
}

type Page = {
  count: number;
  startIndex: number;
};

type Item = {
  title: string;
  link: string;
};

export interface JsonAPIData {
  queries: {
    previousPage: Page[];
    nextPage: Page[];
  };
  items: Item[];
}

export interface LoginOutPut {
  uid: string;
  email: string;
  email_verified?: boolean;
  exp: number;
  refreshToken: string;
  accessToken: any;
}

export enum Auth {
  token = "roxai-accessToken",
  refreshToken = "roxai-refreshToken",
  token_exp = "roxai-accessToken_exp",
}
