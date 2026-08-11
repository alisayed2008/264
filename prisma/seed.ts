import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.featureFlag.createMany({ data: [
    { key: "FEATURE_AI_RECOMMENDATIONS", enabled: false, description: "AI.md — gated until Phase 5 ships" },
    { key: "FEATURE_AI_COMPARISON", enabled: false, description: "AI.md — gated until Phase 5 ships" },
    { key: "FEATURE_HUMAN_REVIEW", enabled: false, description: "ARCHITECTURE.md §8 — supported from v1, default off" },
    { key: "FEATURE_APPOINTMENT_SCHEDULING", enabled: false, description: "Gated until Phase 8 ships" },
    { key: "FEATURE_QUESTIONNAIRE_V2", enabled: false, description: "Reserved for a future questionnaire schema version" },
  ], skipDuplicates: true });
  await prisma.systemConfig.createMany({ data: [
    { key: "freshness.fresh_days", value: 14, description: "DATABASE.md §6 initial default" },
    { key: "freshness.stale_days", value: 45, description: "DATABASE.md §6 initial default" },
  ], skipDuplicates: true });
  console.log("Seeded FeatureFlag and SystemConfig defaults.");
}
main().catch((err) => { console.error(err); process.exitCode = 1; }).finally(async () => { await prisma.$disconnect(); });
