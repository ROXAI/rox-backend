import express from "express";
import { FBAuth } from "../../middlewares/gatekeeper";
import { businessOverview } from "../../controllers/user_business/user_business_overview";
import { updateUserBusiness } from "../../controllers/user_business/update-user-business";
import { onboardBusinessData } from "../../controllers/user_business/onboardBusinessData";
import { BusinessDataOne } from "../../controllers/user_business/get-business-data";
import { addProduct } from "../../controllers/user_business/add-product";
import { updateProduct } from "../../controllers/user_business/update-product";
import { addService } from "../../controllers/user_business/add-service";
import { updateService } from "../../controllers/user_business/update-service";
import { removeProduct } from "../../controllers/user_business/remove-product";
import { removeService } from "../../controllers/user_business/remove-service";
import { products } from "../../controllers/user_business/products";
import { services } from "../../controllers/user_business/services";
import { activeUserBusiness } from "../../middlewares/sessionCache";
import { validateProductInput } from "../../utils/input-validation/productAndServices";

export const router = express.Router();

router.get("/products", FBAuth, activeUserBusiness, products);
router.get("/services", FBAuth, activeUserBusiness, services);
router.get(
  "/onboard-business-data",
  FBAuth,
  activeUserBusiness,
  onboardBusinessData
);
router.get("/getOne-buisness-data", FBAuth, BusinessDataOne);
router.post("/setup-business", FBAuth, businessOverview);
router.post(
  "/updateOne-business-data",
  FBAuth,
  activeUserBusiness,
  updateUserBusiness
);
router.post(
  "/addProduct",
  FBAuth,
  activeUserBusiness,
  validateProductInput,
  addProduct
);

router.post(
  "/addService",
  FBAuth,
  activeUserBusiness,
  validateProductInput,
  addService
);
router.post("/updateProduct", FBAuth, updateProduct);
router.post("/updateService", FBAuth, updateService);
router.delete("/removeService", FBAuth, removeService);
router.delete("/removeProduct", FBAuth, removeProduct);
