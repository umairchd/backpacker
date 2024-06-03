import { useState, useEffect, useMemo } from "react";
import countriesListMenu from "./countries-list-menu";
import useSortedCountries from "@@/pages/lib/useSortedCountries";

export type Countries = "Australia" | "New Zealand";
interface CountriesListProps {
  listCountry: Countries;
}

export const useCountriesList = ({
  listCountry = "Australia",
}: CountriesListProps) => {
  const [placeList, setPlaceList] = useState([]);

  const [isActive, setIsActive] = useState(1);

  const { sortedCountries: countries, cityMap } = useSortedCountries();

  const urlCountry = useMemo(() => {
    return "/" + listCountry.toLocaleLowerCase()?.replace(" ", "-");
  }, [listCountry]);

  const getCityServerContext = useMemo(() => {
    const country = countries.find((c) => c.country.name === listCountry);

    const cities = Array.from(cityMap.get(country.id)).map((c) => c.city);

    return cities;
  }, [countries, listCountry, cityMap]);

  const getPlaceLists = useMemo(() => {
    const cities = getCityServerContext?.filter((place) =>
      placeList?.find((placeList) => placeList.place === place.name)
    );

    const cityList = placeList?.map((place) => {
      const city = cities?.find((placeList) => placeList.name === place.place);

      if (city) {
        return city;
      } else {
        return {
          id: place.id,
          name: place.place,
          uniqueName: place.place,
          uri: {
            url: urlCountry + place.url,
          },
        };
      }
    });

    return cityList;
  }, [getCityServerContext, placeList, urlCountry]);

  const getTopRatedPlaces = useMemo(() => {
    const getTopRated = placeList?.filter(
      (place: { id: number; place: string }) =>
        place.id === 1 ||
        place.id === 2 ||
        place.id === 3 ||
        place.place === "East Coast"
    );

    const cities = getCityServerContext?.filter((place) =>
      getTopRated?.find((topRated) => topRated.place === place.name)
    );

    const cityTopRated = getTopRated?.map((topRated) => {
      const cityTopRated = cities?.find(
        (place) => place.name === topRated.place
      );

      if (cityTopRated) {
        return cityTopRated;
      } else {
        return {
          id: topRated.id,
          name: topRated.place,
          uniqueName: topRated.place,
          uri: {
            url: urlCountry + topRated.url,
          },
        };
      }
    });

    return cityTopRated;
  }, [getCityServerContext, placeList, urlCountry]);

  const getFeaturePlaces = useMemo(() => {
    const getFeatures = placeList?.filter(
      (place) => place.id === 1 || place.id === 2
    );

    const cities = getCityServerContext?.filter((place) =>
      getFeatures?.find((feature) => feature.place === place.name)
    );

    const cityFeatures = getFeatures?.map((feature) => {
      const cityFeature = cities?.find((place) => place.name === feature.place);

      if (cityFeature) {
        return cityFeature;
      } else {
        return {
          id: feature.id,
          name: feature.place,
          uniqueName: feature.place,
          uri: {
            url: urlCountry + feature.url,
          },
        };
      }
    });

    return cityFeatures;
  }, [getCityServerContext, placeList, urlCountry]);

  const setRegion = (id: number) => {
    const cities = countriesListMenu.find(
      (country) => country.country === listCountry
    )?.cities;

    const cityData = cities?.find(
      (place: { id: number }) => place.id === id
    )?.placeList;
    setPlaceList(cityData);
    setIsActive(id);
  };

  useEffect(() => {
    const cities = countriesListMenu.find(
      (country) => country.country === listCountry
    )?.cities;

    const cityData = cities?.find(
      (place: { id: number }) => place.id === 1
    )?.placeList;

    setPlaceList(cityData);
  }, [listCountry]);

  return {
    isActive,
    countriesListMenu,
    getPlaceLists,
    getFeaturePlaces,
    getTopRatedPlaces,
    getCityServerContext,
    setRegion,
  };
};
