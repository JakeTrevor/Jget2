import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        main: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-var-requires
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
  ],
} satisfies Config;
