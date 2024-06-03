import { ListPageProductStatisticsQuery } from "@@/pages/Level1Page/queries/level1Page-queries.generated";
import {
  CategoryCardFragment,
  CityCardFragment,
  CountryCardFragment,
} from "@@/pages/components/queries/queries.generated";

export type AdditionalInfoProps = ListPageProductStatisticsQuery["productsStatistics"];

export interface MoreActivitiesProps {
  country: CountryCardFragment;
  cityUniqueName?: string;
  categoryUniqueName?: string;
  destinationOptionsType: string;
  hideFilters: boolean;
  countries: CountryCardFragment[];
  cities: CityCardFragment[];
}

export interface DestinationFooterProps {
  header?: string;
  teaser?: string;
}

export interface TopThreeProductsProps {
  name: string;
  country: CountryCardFragment;
  city: CityCardFragment;
  category: CategoryCardFragment;
}

export interface ProductCountProps {
  item: {
    name: string;
    productCount: number;
    uniqueName: string;
  };
  url: string;
}

export const MAX_CATEGORY_SHOW = 6;
export const MAX_CATEGORY_SHOW_MOBILE = 4;
export const ALL_PAGE_LIMIT = 150;
export const MAX_PAGE_HARD_LIMIT = 150;
export const MAX_PRODUCTS_PER_PAGE = 21;
