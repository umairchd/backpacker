import { Poppins } from "next/font/google";
const poppins = Poppins({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-primary",
  display: "swap",
  preload: false,
});

export const globalFonts = () => {
  return { poppins };
};
