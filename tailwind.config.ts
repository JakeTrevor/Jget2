import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)"],
      },
    },
    hljs: {
      theme: "atom-one-dark",
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    plugin(function ({ addUtilities, addVariant }) {
      addUtilities({
        ".debug": {
          outline: "2px solid;",
          "outline-color": "hsl(14, 80%, 50%);",
        },
      });
      addVariant("children", "&>*");
    }),
    require("tailwind-highlightjs"),
  ],
  safelist: [
    {
      pattern: /hljs+/,
    },
  ],
} satisfies Config;
