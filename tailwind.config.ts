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
      custom: {
        base: {
          background: "#1a1919",
          color: "#ffffff",
        },
        general: {
          comment: {
            color: "#64748b",
          },
          title: {
            color: "#a7956e",
          },
          params: {
            color: "#e3e3b5",
          },
          string: {
            color: "#22c55e",
          },
          number: {
            color: "#f89b7a",
          },
          keyword: {
            color: "#8207e7",
            fontStyle: "italic",
          },
          built_in: {
            color: "#0ea5e9",
            fontStyle: "italic",
          },
          // other general styles
        },
      },
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
