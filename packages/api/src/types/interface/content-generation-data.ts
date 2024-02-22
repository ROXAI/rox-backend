import { Product, Service, UserBusiness } from "./business-data";

export interface GenerateAdDependencyDataType {
  businessId: string;
  products: string[];
  services: string[];
  adQuantity: number;
  tone: string;
  businessInfo: Pick<
    UserBusiness,
    "description" | "businessName" | "additionalDetails"
  >;
}
