import { usePathname } from "next/navigation";
import { CAMPERVAN_HIRE_URL } from "./utils";
import { useChannelUtil } from "@@/pages/utils/useChannelUtil";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { CAR_RENTAL_URL } from "@@/pages/utils/constants";

export const useCampervanHooks = () => {
  const pathname = usePathname();
  const isCampervanHire = pathname?.includes(CAMPERVAN_HIRE_URL) || pathname?.includes("booking");
  const isCarRental = pathname?.includes(CAR_RENTAL_URL);

  const { channel } = useServerContext();
  const { key } = channel ?? {};
  const { isBackpackerDealsChannel, isTravelloChannel } = useChannelUtil(key);

  const isCampervanHirePage = isBackpackerDealsChannel() || isTravelloChannel();
  const isTravelloCampervanPage: boolean = isCampervanHire && isTravelloChannel();

  return {
    isCampervanHire,
    isCampervanHirePage,
    isCarRental,
    isTravelloCampervanPage,
  };
};
