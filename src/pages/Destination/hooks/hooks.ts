import { AdditionalInfoProps, MAX_CATEGORY_SHOW } from "../types";
import { FIELDS } from "@@/features/filterForm/model/types";
import { useProductStatisticsQuery } from "@@/pages/Destination/queries/destination-page-queries.generated";
import { useFormContext } from "react-hook-form";
import {
  CategoryCardFragment,
  CountryCardFragment,
  CityCardFragment,
} from "@@/pages/components/queries/queries.generated";

export const useAdditionalInfo = ({ cities, categories }: AdditionalInfoProps) => {
  const sortedCities = cities
    ?.map((c) => ({ ...c.city, productCount: c.productCount }))
    .sort((a, b) => a.name?.localeCompare(b.name));

  const sortedCategories = categories
    ?.map((c) => ({
      ...c.category,
      productCount: c.productCount,
    }))
    .sort((a, b) => a.name?.localeCompare(b.name));

  const sortedCategoriesByProductCount = categories
    ?.map((c) => ({
      ...c.category,
      productCount: c.productCount,
    }))
    .sort((a, b) => b.productCount - a.productCount)
    .slice(0, MAX_CATEGORY_SHOW);

  return {
    sortedCities,
    sortedCategories,
    sortedCategoriesByProductCount,
  };
};

export const useProductStaticForCategoryAndDestination = (
  contextCategories: CategoryCardFragment[],
  countries: CountryCardFragment[],
  cities: CityCardFragment[],
  country: CountryCardFragment,
  destinationOptionsType: string,
) => {
  const { getValues, setValue } = useFormContext();
  const values = getValues();

  const filterCategoryUniqueNameDestinations = contextCategories
    .filter((i) => values[FIELDS.CATEGORIES].includes(i.uniqueName))
    .map((i) => i.uniqueName);
  const filterCountryUniqueNameDestinations = country && [country.uniqueName];

  const filterCountryUniqueNameCategories =
    destinationOptionsType === "country"
      ? countries.filter((i) => values[FIELDS.DESTINATION].includes(i.uniqueName)).map((i) => i.uniqueName)
      : country && [country.uniqueName];

  const filterCityUniqueNameCategories =
    destinationOptionsType === "city" &&
    cities.filter((i) => values[FIELDS.DESTINATION].includes(i.uniqueName)).map((i) => i.uniqueName);

  const { data: productStatisticsDataForCategories, loading: productStatisticsDataForCategoriesFetching } =
    useProductStatisticsQuery({
      variables: {
        filter: {
          countryUniqueNames: filterCountryUniqueNameCategories,
          cityUniqueNames: filterCityUniqueNameCategories,
        },
      },
    });

  const { data: productStatisticsDataForDestinations, loading: productStatisticsDataForDestinationsFetching } =
    useProductStatisticsQuery({
      variables: {
        filter: {
          categoryUniqueNames: filterCategoryUniqueNameDestinations,
          countryUniqueNames: filterCountryUniqueNameDestinations,
        },
      },
    });

  return {
    productStatisticsDataForCategories,
    productStatisticsDataForDestinations,
    productStatisticsDataForCategoriesFetching,
    productStatisticsDataForDestinationsFetching,
    getValues,
    setValue,
    values,
  };
};
