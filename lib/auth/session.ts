import { auth } from "@/auth";
import { ForbiddenError, UnauthenticatedError } from "@/lib/api/errors";
import { hasPermission, type Permission, type Role } from "./permissions";

export interface SessionUser { id: string; role: Role; email: string; }
export async function requireSession(): Promise<SessionUser> {
  const session = await auth();
  if (!session?.user?.id) throw new UnauthenticatedError();
  return { id: session.user.id, role: session.user.role, email: session.user.email ?? "" };
}
export async function requireRole(...allowed: Role[]): Promise<SessionUser> {
  const user = await requireSession();
  if (!allowed.includes(user.role)) throw new ForbiddenError();
  return user;
}
export async function requirePermission(permission: Permission): Promise<SessionUser> {
  const user = await requireSession();
  if (!hasPermission(user.role, permission)) throw new ForbiddenError();
  return user;
}
export async function requireCustomer(): Promise<SessionUser> { return requireRole("CUSTOMER"); }
export async function requireSuperAdmin(): Promise<SessionUser> { return requireRole("SUPER_ADMIN"); }
