import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { config as loadDotenv } from 'dotenv';
import { z } from 'zod';

const backendRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '../..'
);

if (!process.env.VERCEL) {
  loadDotenv({ path: path.join(backendRoot, '.env') });
}

function resolveCorsOrigin(): string | undefined {
  if (process.env.CORS_ORIGIN) {
    return process.env.CORS_ORIGIN;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return undefined;
}

const envSchema = z.object({
  LISTINGS_API_BASE_URL: z.string().url(),
  LISTINGS_CLIENT_ID: z.string().min(1),
  LISTINGS_CLIENT_SECRET: z.string().min(1),
  CORS_ORIGIN: z.string().min(1),
  PORT: z.coerce.number().int().positive().default(3001),
});

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse({
    ...process.env,
    CORS_ORIGIN: resolveCorsOrigin(),
  });

  if (!result.success) {
    const formatted = result.error.issues
      .map((issue) => `  - ${issue.path.join('.')}: ${issue.message}`)
      .join('\n');
    throw new Error(`Invalid environment configuration:\n${formatted}`);
  }

  return result.data;
}

export const env = parseEnv();
