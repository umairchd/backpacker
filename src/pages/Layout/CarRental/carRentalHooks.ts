import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useMemo } from "react";
import { CAR_RENTAL_URL } from "@@/pages/utils/constants";

const ROAVER_KEY = {
  BPD_STAGE: "stage-bpd",
  BPD_LIVE: "backpacker-deals",
  TRAVELLO_LIVE: "travello",
  LOCALHOST: "localhost",
};

const getDataKeyForLocalAndStage = (isLocalhost: boolean, isStage: boolean) => {
  if (isLocalhost) {
    return ROAVER_KEY.LOCALHOST;
  } else if (isStage) {
    return ROAVER_KEY.BPD_STAGE;
  }
};

export const useCarRentalLinks = () => {
  const { channel } = useServerContext();
  const { key } = channel ?? {};

  const carRentalDetails = useMemo(() => {
    const currentDomain = typeof window !== "undefined" && window?.location?.origin ? window.location.origin : "";
    const isLocalhost = currentDomain.includes("localhost");
    const isStage = currentDomain.includes("stage");
    const isLocalhostOrStage = isLocalhost || isStage;

    const rentalCarHref = isLocalhostOrStage
      ? `${currentDomain}${CAR_RENTAL_URL}`
      : `https://${channel.key}.com${CAR_RENTAL_URL}`;

    switch (key) {
      case "backpackerdeals":
        return {
          key: "backpackerdeals",
          dataKey: isLocalhostOrStage ? getDataKeyForLocalAndStage(isLocalhost, isStage) : ROAVER_KEY.BPD_LIVE,
          channel: "backpackerdeals",
          search: "",
          name: "Backpacker Deals",
          href: rentalCarHref,
        };
      case "travello":
      case "sydneyexpert":
        return {
          key: "travello",
          dataKey: isLocalhostOrStage ? getDataKeyForLocalAndStage(isLocalhost, isStage) : ROAVER_KEY.TRAVELLO_LIVE,
          channel: "travelloapp",
          search: "search",
          name: "Travello",
          href: rentalCarHref,
        };
      default:
        return null;
    }
  }, [key]);

  return carRentalDetails;
};
