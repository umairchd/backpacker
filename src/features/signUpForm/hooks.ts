import { getCountryListMap } from "country-flags-dial-code";
import { CountryInfoItem } from "./types";
import { useEffect, useState } from "react";

function sleep(duration: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export const useCountryList = () => {
  const countryList: Array<CountryInfoItem> = Object.values(getCountryListMap());

  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState<readonly CountryInfoItem[]>([]);
  const loading = open && countries.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setCountries([...countryList]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setCountries([]);
    }
  }, [open]);

  return {
    countries,
    loading,
    open,
    setOpen,
  };
};
