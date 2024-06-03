import { useMemo } from "react";

import { useClientContext } from "@@/app/lib/ClientInfoProvider";
import { useServerContext } from "../lib/ServerContextProvider";

export const usePhoneNumber = () => {
  const { siteConfig } = useServerContext();
  const { clientInfo } = useClientContext();

  return useMemo(() => {
    switch (clientInfo?.isoCountryCode) {
      case "AU":
        return siteConfig?.contact_links_phone;
      case "NZ":
        return siteConfig?.contact_physical_phone;
      case "US":
        return siteConfig?.contact_phone_us;
      default:
        return siteConfig?.contact_phone_default;
    }
  }, [clientInfo, siteConfig]);
};
