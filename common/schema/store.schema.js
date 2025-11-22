import { z } from "zod";

export const storeSchema = z
  .object({
    storeName: z.string().min(1, "Store name is required"),
    baseURL: z.string().url("Invalid URL format"),
    consumerKey: z.string().min(1, "Consumer Key is required"),
    consumerSecret: z.string().min(1, "Consumer Secret is required"),
  })
  .strict();
