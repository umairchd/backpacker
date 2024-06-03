import { useMemo } from "react";
import { useServerContext } from "./ServerContextProvider";
import getSortedCountries from "@@/app/data/getSortedCountries";

const useSortedCountries = () => {
  const { allStatistics } = useServerContext();

  return useMemo(() => {
    return getSortedCountries(allStatistics);
  }, [allStatistics]);
};

export default useSortedCountries;
