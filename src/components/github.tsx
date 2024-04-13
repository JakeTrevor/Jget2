"use client";

import { useTheme } from "next-themes";

import GithubMark from "~/icons/github-mark.svg";
import GithubMarkDark from "~/icons/github-mark-white.svg";

export function Github() {
  const { theme } = useTheme();

  return theme === "dark" ? (
    <GithubMarkDark className="scale-[35%]" />
  ) : (
    <GithubMark className="scale-[35%]" />
  );
}
