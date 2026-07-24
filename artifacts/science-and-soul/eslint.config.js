import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  { ignores: ["node_modules", "dist"] },
  {
    files: ["src/**/*.{ts,tsx}"],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    plugins: {
      "jsx-a11y": jsxA11y,
    },
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
      // role="list" is kept intentionally: Safari/VoiceOver drops list
      // semantics when list-style is removed, so the explicit role restores it.
      "jsx-a11y/no-redundant-roles": ["error", { ul: ["list"] }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
    languageOptions: {
      ...jsxA11y.flatConfigs.recommended.languageOptions,
    },
  },
  {
    // shadcn/ui library primitives: polymorphic wrappers trigger false
    // positives (content/handlers are provided by consumers at usage sites).
    files: ["src/components/ui/**"],
    rules: {
      "jsx-a11y/heading-has-content": "off",
      "jsx-a11y/anchor-has-content": "off",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
    },
  },
);
