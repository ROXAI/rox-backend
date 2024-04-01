import { Product, Service, BusinessProfile } from "./business-data";

export interface GenerateAdDependencyDataType {
  businessId: string;
  products: string[];
  services: string[];
  adQuantity: number;
  tone: string;
  businessInfo: Pick<
  BusinessProfile,
    "description" | "businessName" | "additionalDetails"
  >;
}
