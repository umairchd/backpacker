import { SimpleCityCardProps } from "@@/pages/components/CityCard/CityCard";
import { Countries } from "./hooks/useCountriesList";

export interface CountriesMenuProps {
  variant?: "mobile" | "";
  listCountry?: Countries;
  className?: string;
  isBusPassVisible: boolean;
}

export interface CountriesMenuMobileProps {
  menuMobile: {
    countries: {
      cities: { id: number; region: string }[];
      country: string;
      url: string;
    };
    setRegion: (id: number) => void;
    getFeaturePlaces: SimpleCityCardProps[];
    getTopRatedPlaces: SimpleCityCardProps[];
    getPlaceLists: SimpleCityCardProps[];
    isActive: number;
    listCountry: Countries;
  };
}

export interface MenuHeaderProps {
  countries: {
    country: string;
    url: string;
  };
  isBusPassVisible: boolean;
}

export interface MenuBodyProps {
  menuBody: {
    countries: {
      cities: { id: number; region: string }[];
      country: string;
      url: string;
    };
    setRegion: (id: number) => void;
    isActive: number;
    listCountry: Countries;
    getFeaturePlaces: SimpleCityCardProps[];
    getPlaceLists: SimpleCityCardProps[];
    getTopRatedPlaces: SimpleCityCardProps[];
  };
}

export interface TopRatesProps {
  rates: SimpleCityCardProps[];
  listCountry: Countries;
  isActive: number;
}

export interface RegionListsProps {
  country: {
    cities: {
      id: number;
      region: string;
    }[];
  };
  setRegion: (id: number) => void;
  isActive: number;
}

export interface PlaceListsProps {
  lists: SimpleCityCardProps[];
}

export interface FeatureCityCardProps {
  features: SimpleCityCardProps[];
}
