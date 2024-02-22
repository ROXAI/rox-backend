import { UserBusiness } from "../../types";

export function validateUserBusiness(userBusiness: UserBusiness): string {
  if (
    !userBusiness.businessName ||
    typeof userBusiness.businessName !== "string"
  ) {
    console.error("Invalid or missing businessName");
    return "Invalid or missing businessName";
  }

  if (
    !userBusiness.description ||
    typeof userBusiness.description !== "string"
  ) {
    console.error("Invalid or missing description");
    return "Invalid or missing description";
  }

  if (
    (!userBusiness.productCategories ||
      !userBusiness.productCategories[0].name) &&
    (!userBusiness.serviceCategories || !userBusiness.serviceCategories[0].name)
  ) {
    console.error("Invalid or missing productCategories or serviceCategories");
    return "Invalid or missing productCategories or serviceCategories";
  }

  // You can add more specific validation for the subcategories if needed

  return "";
}

export function validateObjectFields(object:any) {
  // Loop through each object property
  for (const key in object) {
    // Check if the property is empty
    if (!object[key]) {
      return false; // The object has an empty field
    }
  }
  return true; // All fields are not empty
}
