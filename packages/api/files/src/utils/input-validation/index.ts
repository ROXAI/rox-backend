import { z } from "zod";

export const IGUserSchemaInput = z.object({
  userId: z.string(),
  accessToken: z.string(),
  exp: z.number().positive(),
});

export const FBUserSchemaInput = z.object({
  userId: z.string(),
  accessToken: z.string(),
  exp: z.number(),
  page: z.object({
    id: z.string(),
    name: z.string(),
    access_token: z.string(),
  }),
});
