import type { ValuesType } from "utility-types";
import { HomePageQuery } from "@@/pages/queries.generated";

export interface TrendingDestinationProps {
  isDesktop: boolean;
}

export interface TrendingDestinationTileProps {
  destination: {
    id: number;
    title: string;
    description: string;
    textUrl: string;
    url: string;
    image: string;
  };
  width: number | string;
  height: number | string;
  className?: string;
}

export interface BannerProps {
  banners: IHomeBanners;
}

export interface BackpackerdealsHomepageProps {
  isBackpackerdealsChannel: boolean;
  banners: IHomeBanners;
}

export type IHomeBanners = HomePageQuery["channel"]["banners"];
export type IHomeBanner = ValuesType<IHomeBanners>;
