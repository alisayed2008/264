import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  DATABASE_URL: z.string().url(),
  AUTH_SECRET: z.string().min(32),
  AUTH_URL: z.string().url().optional(),
  GOOGLE_CLIENT_ID: z.string().min(1).optional(),
  GOOGLE_CLIENT_SECRET: z.string().min(1).optional(),
  OPENAI_API_KEY: z.string().optional(),
  AI_RECOMMENDATION_MODEL: z.string().optional(),
  AI_COMPARISON_MODEL: z.string().optional(),
  MEDIA_STORAGE_PROVIDER: z.enum(["vercel_blob", "s3", "cloudinary"]).optional(),
  ASYNC_JOB_PROVIDER: z.enum(["vercel_cron", "vercel_wait_until", "upstash_qstash"]).optional(),
  NEXT_PUBLIC_APP_URL: z.string().url(),
});
export type Env = z.infer<typeof envSchema>;
function loadEnv(): Env {
  if (typeof window !== "undefined") throw new Error("lib/env.ts is server-only.");
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
  return parsed.data;
}
export const env = loadEnv();
