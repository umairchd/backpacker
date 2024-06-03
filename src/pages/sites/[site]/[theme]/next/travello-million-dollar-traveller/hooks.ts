import { useMemo } from "react";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { URL_MILLION_DOLLAR_TRAVELLER } from "@@/features/giveawaySignUpForm/utils/utils";

export const useMillionDollarTravellers = () => {
  const { siteConfig, host, shouldShowMillionDollarLandingPage } =
    useServerContext();
  const { iterable_key } = siteConfig ?? {};

  const url = useMemo(() => {
    if (!host.startsWith("https://")) {
      return "https://" + host + URL_MILLION_DOLLAR_TRAVELLER;
    }

    return host + URL_MILLION_DOLLAR_TRAVELLER;
  }, [host]);

  return { url, iterable_key, shouldShowMillionDollarLandingPage };
};
