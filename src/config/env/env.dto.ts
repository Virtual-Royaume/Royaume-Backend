import { z } from "zod";

export const envDTO = z.object({
  PORT: z.number(),
  POSTGRES_URI: z.string().url(),
  API_TOKEN: z.string().uuid()
});