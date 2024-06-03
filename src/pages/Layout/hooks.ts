import defaultOgImage from "@@/themes/images/feature-menu-empty.jpg";
import { OpenGraphImage, UseOpenGraphImageProps } from "./types";

export const getOpenGraphImage = ({ openGraphImage, twitterCardImage }: UseOpenGraphImageProps): OpenGraphImage => {
  const openGraph_image = openGraphImage?.fileName;
  const twitterCard_image = twitterCardImage?.fileName;

  const isSvg = (url: string): boolean => {
    return url.endsWith(".svg");
  };

  switch (true) {
    case isSvg(openGraph_image || "") && isSvg(twitterCard_image || ""):
      return {
        openGraph_image: defaultOgImage?.src,
        twitterCard_image: defaultOgImage?.src,
      };
    default:
      return {
        openGraph_image,
        twitterCard_image,
      };
  }
};
