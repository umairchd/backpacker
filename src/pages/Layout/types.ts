import { ReactNode } from "react";
import { type StaticImageData } from "next/image";

export interface LocalPhoneNumberProps {
  isMobile: boolean;
  isYhaChannel: boolean;
}

export interface MainProps {
  mainContainerClass?: string;
  children: ReactNode;
  isBannerActive?: boolean;
}

export interface UseOpenGraphImageProps {
  openGraphImage?: {
    fileName?: string;
  };
  twitterCardImage?: {
    fileName?: string;
  };
}

export interface OpenGraphImage {
  openGraph_image: string | StaticImageData;
  twitterCard_image: string | StaticImageData;
}

export interface MobileNavProps {
  channelKey: {
    isBackpackerDealsChannel: () => boolean;
    isYhaChannel: () => boolean;
    isJucyChannel: () => boolean;
    isSpaceShipsChannel: () => boolean;
  };
}
