import { NextRequest } from "next/server";
import { withApiHandler } from "@/lib/api/handler";
import { ok } from "@/lib/api/response";
import { RegisterSchema } from "@/lib/validation/auth";
import { enforceRateLimit } from "@/lib/rate-limit";
import { UserService } from "@/server/services/user-service";

export const POST = withApiHandler("auth.register", async (req: NextRequest) => {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  await enforceRateLimit({ identifier: ip, action: "register", limit: 5, windowSeconds: 3600 });

  const body = RegisterSchema.parse(await req.json());
  await UserService.register(body);

  return ok({ message: "If this email can be registered, check it to continue." }, { status: 201 });
});
