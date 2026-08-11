export type Role = "CUSTOMER" | "AGENT" | "ADMIN" | "SUPER_ADMIN";

export const PERMISSIONS = {
  MANAGE_LEADS: ["ADMIN", "SUPER_ADMIN", "AGENT"],
  MANAGE_PROPERTIES: ["ADMIN", "SUPER_ADMIN"],
  MANAGE_RECOMMENDATIONS: ["ADMIN", "SUPER_ADMIN"],
  PERFORM_HUMAN_REVIEW: ["ADMIN", "SUPER_ADMIN", "AGENT"],
  MANAGE_APPOINTMENTS: ["ADMIN", "SUPER_ADMIN", "AGENT"],
  MANAGE_OPERATIONAL_CONTENT: ["ADMIN", "SUPER_ADMIN"],
  MANAGE_USERS_AND_ROLES: ["SUPER_ADMIN"],
  MANAGE_FEATURE_FLAGS: ["SUPER_ADMIN"],
  MANAGE_SYSTEM_CONFIG: ["SUPER_ADMIN"],
  MANAGE_PROVIDER_CONFIG: ["SUPER_ADMIN"],
  MANAGE_SECURITY_SETTINGS: ["SUPER_ADMIN"],
} as const satisfies Record<string, readonly Role[]>;

export type Permission = keyof typeof PERMISSIONS;
export function hasPermission(role: Role, permission: Permission): boolean {
  return (PERMISSIONS[permission] as readonly Role[]).includes(role);
}
