import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // The whole platform's separation-of-concerns rule (ARCHITECTURE.md §1)
      // is enforced by code review in Phase 1; a real lint boundary (e.g.
      // eslint-plugin-boundaries restricting ai/ imports to AIAnalysisService)
      // is planned but not wired up until Phase 5 introduces the ai/ module.
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];

export default eslintConfig;
