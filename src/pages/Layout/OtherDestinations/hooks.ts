import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useMemo } from "react";

export const usePopularCountries = () => {
  const {
    allStatistics: { countries = [] },
  } = useServerContext();

  return useMemo(() => {
    const countriesWithOffers = countries
      .filter((country) => country.productCount > 0)
      .sort((a, b) => (a.productCount > b.productCount ? -1 : 1));

    return {
      popularCountries: countriesWithOffers.slice(0, 8),
      moreCountries: countriesWithOffers.slice(8).sort((a, b) => (a.country.name > b.country.name ? 1 : -1)),
    };
  }, [countries]);
};
