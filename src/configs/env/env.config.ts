import "dotenv/config";
import { envDTO } from "./env.dto";

// Variables:
const parser = envDTO.safeParse(process.env);

if (!parser.success) throw Error("Missing environment variable", { cause: parser.error.message });

export const env = parser.data;