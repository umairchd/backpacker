import { ProductStatisticsQuery } from "@@/pages/Destination/queries/destination-page-queries.generated";
import {
  CountryCardFragment,
  CategoryCardFragment,
  CityCardFragment,
} from "@@/pages/components/queries/queries.generated";

export const getFiltersOptions = (
  categoryValues: string[],
  destinationValues: string[],
  categoryOptions: string | any[],
  destinationOptions: string | any[],
  destinationOptionsType: string,
  countryUniqueName: string,
): {
  categoriesFilter: string[];
  countriesFilter: string[];
  citiesFilter: string[];
} => {
  let countriesFilter: string[];
  let citiesFilter: string[];

  const categoriesFilter = categoryValues?.length === categoryOptions.length ? [] : categoryValues;

  const destinationFilterValue = destinationValues?.length === destinationOptions.length ? [] : destinationValues;

  if (destinationOptionsType === "country") {
    countriesFilter = destinationFilterValue;
  } else {
    countriesFilter = countryUniqueName ? [countryUniqueName] : [];
    citiesFilter = destinationFilterValue;
  }

  return {
    categoriesFilter,
    countriesFilter,
    citiesFilter,
  };
};

const getFilterDropdownOptionLabels = (
  statisticArr: { name: string; uniqueName: string; productCount: number }[],
  options: (CountryCardFragment | CityCardFragment | CategoryCardFragment)[],
) => {
  const result = options
    .map((i) => {
      let productCount = i.productCount;

      if (statisticArr) {
        const updatedCount = statisticArr.find((j) => j.uniqueName === i.uniqueName)?.productCount;

        productCount = updatedCount || 0;
      }

      return {
        id: parseInt(i.id, 10),
        value: i.uniqueName,
        label: i.name,
        uniqueName: i.uniqueName,
        productCount,
      };
    })
    .filter((i) => i.productCount !== 0);

  result.sort((a, b) => b.productCount - a.productCount);

  return result;
};

export const getFilterDropdownsOptions = (
  destinationOptionsType: string,
  statisticsDestinations: ProductStatisticsQuery,
  statisticsCategories: ProductStatisticsQuery,
  relatedCountries: CountryCardFragment[],
  relatedCities: CityCardFragment[],
  relatedCategories: CategoryCardFragment[],
) => {
  const destinations = getFilterDropdownOptionLabels(
    destinationOptionsType === "country"
      ? statisticsDestinations?.productsStatistics.countryStatistic
      : statisticsDestinations?.productsStatistics.cityStatistic,
    destinationOptionsType === "country" ? relatedCountries : relatedCities,
  );

  const categories = getFilterDropdownOptionLabels(
    statisticsCategories?.productsStatistics.categoryStatistic,
    relatedCategories,
  );

  return { destinationOptionsType, destinations, categories };
};
