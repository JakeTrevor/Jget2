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
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    plugin(function ({ addComponents }) {
      addComponents({
        ".debug": {
          outline: "2px solid;",
          "outline-color": "hsl(14, 80%, 50%);",
        },
      });
    }),
  ],
} satisfies Config;
