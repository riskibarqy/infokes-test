import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config(); 

const DATABASE_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

export default defineConfig({
  schema: "./apps/backend/src/domain/entities", 
  out: "./apps/backend/src/migrations", 
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
});
