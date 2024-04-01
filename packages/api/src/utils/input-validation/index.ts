import { z } from "zod";

export const IGUserSchemaInput = z.object({
  userId: z.string(),
  accessToken: z.string(),
  exp: z.number().positive(),
});

export const FBUserSchemaInput = z.object({
  userId: z.string(),
  isConnected: z.boolean(),
  tokenManager: z.object({
    accessToken: z.string(),
    isValid: z.boolean(),
  }),
  page: z.object({
    id: z.string(),
    name: z.string(),
    access_token: z.string(),
  }),
});
