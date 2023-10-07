import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        main: {
          ...require("daisyui/src/theming/themes")["[data-theme=lofi]"],
          primary: "#000000", //black
          secondary: "#0EA5E9", // sky-500
          accent: "#84CC16", // lime-500 (grass)
          neutral: "#64748B", // slate-500 (stone)
          "base-100": "#FFFFFF", // white
          info: "#0EA5E9", // sky-500
          success: "#21CC51", // ?
          warning: "#E3E3B5", // "sand"
          error: "#dc2626", // red-600 "redstone",

          ".mockup-code": {
            "background-color": "#1a1919",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        code: "#1a1919",
      },
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
