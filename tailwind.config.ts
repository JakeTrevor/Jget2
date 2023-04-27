import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["var(--font-title)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
