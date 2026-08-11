import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { ApiError, InternalError, ValidationError } from "./errors";
import { fail } from "./response";
import { logger } from "@/lib/logging/logger";

type RouteContext = { params: Promise<Record<string, string>> };
type RouteFn = (req: NextRequest, ctx: RouteContext) => Promise<NextResponse>;

export function withApiHandler(operation: string, fn: RouteFn): RouteFn {
  return async (req, ctx) => {
    const requestId = randomUUID();
    const start = Date.now();
    try {
      const response = await fn(req, ctx);
      logger.info({ requestId, operation, status: "success", durationMs: Date.now() - start });
      return response;
    } catch (err) {
      const durationMs = Date.now() - start;
      if (err instanceof ZodError) {
        const validation = new ValidationError(err.issues[0]?.message ?? "Invalid input.");
        logger.warn({ requestId, operation, status: "failure", durationMs, errorCode: validation.code });
        return fail(validation.code, validation.message, validation.httpStatus);
      }
      if (err instanceof ApiError) {
        logger.warn({ requestId, operation, status: "failure", durationMs, errorCode: err.code });
        return fail(err.code, err.message, err.httpStatus);
      }
      const internal = new InternalError();
      logger.error({ requestId, operation, status: "failure", durationMs, errorCode: internal.code, rawError: err instanceof Error ? err.message : String(err) });
      return fail(internal.code, internal.message, internal.httpStatus);
    }
  };
}
