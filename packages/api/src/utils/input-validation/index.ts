import { z } from "zod";

export const IGUserSchemaInput = z.object({
  userId: z.string(),
  accessToken: z.string(),
  exp: z.number().positive(),
});
