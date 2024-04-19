import { z } from "zod";
import validateInput from "../../middlewares/input-validator";

export const IGUserSchemaInput = z.object({
  userId: z.string(),
  accessToken: z.string(),
  exp: z.number().positive(),
});

const ProductInputValidation = z
  .object({
    name: z.string(),
    description: z.string(),
    categories: z.array(z.string()),
    subCategories: z.array(z.string()),
  })
  .strict();

export const validateProductInput = validateInput(ProductInputValidation);
