import { z } from "zod";

export const environmentVariable = () => ({
  port: z.number().parse(Number(process.env.PORT)),
  mongoUrl: z.string().url().parse(process.env.MONGO_LINK),
  apiToken: z.string().uuid().parse(process.env.API_TOKEN_ACCESS)
});