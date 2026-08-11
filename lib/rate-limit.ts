import { prisma } from "@/lib/db/prisma";
import { RateLimitedError } from "@/lib/api/errors";

export async function enforceRateLimit(params: { identifier: string; action: string; limit: number; windowSeconds: number }): Promise<void> {
  const { identifier, action, limit, windowSeconds } = params;
  const windowStart = new Date(Math.floor(Date.now() / (windowSeconds * 1000)) * windowSeconds * 1000);
  const bucket = await prisma.rateLimitBucket.upsert({ where: { identifier_action_windowStart: { identifier, action, windowStart } }, create: { identifier, action, windowStart, count: 1 }, update: { count: { increment: 1 } } });
  if (bucket.count > limit) throw new RateLimitedError();
}
