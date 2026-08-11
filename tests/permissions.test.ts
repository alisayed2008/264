import { describe, expect, it } from "vitest";
import { hasPermission } from "@/lib/auth/permissions";

describe("hasPermission", () => {
  it("only SUPER_ADMIN manages feature flags", () => {
    expect(hasPermission("SUPER_ADMIN", "MANAGE_FEATURE_FLAGS")).toBe(true);
    expect(hasPermission("ADMIN", "MANAGE_FEATURE_FLAGS")).toBe(false);
    expect(hasPermission("AGENT", "MANAGE_FEATURE_FLAGS")).toBe(false);
    expect(hasPermission("CUSTOMER", "MANAGE_FEATURE_FLAGS")).toBe(false);
  });
  it("Admin manages properties, Agent and Customer do not", () => {
    expect(hasPermission("ADMIN", "MANAGE_PROPERTIES")).toBe(true);
    expect(hasPermission("SUPER_ADMIN", "MANAGE_PROPERTIES")).toBe(true);
    expect(hasPermission("AGENT", "MANAGE_PROPERTIES")).toBe(false);
    expect(hasPermission("CUSTOMER", "MANAGE_PROPERTIES")).toBe(false);
  });
  it("Agent has human-review capability at role level", () => {
    expect(hasPermission("AGENT", "PERFORM_HUMAN_REVIEW")).toBe(true);
    expect(hasPermission("CUSTOMER", "PERFORM_HUMAN_REVIEW")).toBe(false);
  });
});
