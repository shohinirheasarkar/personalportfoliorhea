import { DM_Sans, Fraunces, JetBrains_Mono } from "next/font/google";

export const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const fontVariables = [
  dmSans.variable,
  fraunces.variable,
  jetbrainsMono.variable,
].join(" ");
