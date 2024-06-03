import produce from "immer";
import { CityCardV2Fragment } from "@@/pages/components/queries/queries.generated";
import { AllProductStatisticsQuery } from "./queries.generated";

const getSortedCountries = (allStatistics: AllProductStatisticsQuery["allStatistics"]) => {
  const { countries = [], cities = [] } = allStatistics;

  const cityMap = new Map<string, Set<CityCardV2Fragment>>();
  const sortedCities = produce(cities, (draft) => {
    draft.sort((a, b) => (a.city.name > b.city.name ? 1 : -1));
  });

  sortedCities.forEach((c) => {
    const countryId = c.city.country?.id;
    if (!countryId) {
      return;
    }
    if (!cityMap.has(countryId)) {
      cityMap.set(countryId, new Set());
    }
    cityMap.get(countryId).add(c);
  });

  const sortedCountries = produce(countries, (draft) => {
    draft.sort((a, b) => (a.country.name > b.country.name ? 1 : -1));
  });

  return {
    sortedCountries,
    sortedCountriesWithCities: sortedCountries.map((c) => ({
      ...c,
      cities: Array.from(cityMap.get(c.id)),
    })),
    cityMap,
  };
};

export default getSortedCountries;
