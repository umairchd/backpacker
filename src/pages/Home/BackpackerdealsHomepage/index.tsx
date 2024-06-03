import { FC } from "react";
import { useBreakpoints, useQuickSearchBreakpoints } from "@@/features/utils";
import { BackpackerdealsHomepageProps } from "./types";

import TrendingDestinations from "./components/TrendingDestinations";
import TravelInspiration from "./components/TravelInspiration";
import TrustpilotWidget from "@@/pages/components/TrustpilotWidget/TrustpilotWidget";
import CampervanHire from "./components/CampervanHire";
import SeoContent from "../SeoContent/SeoContent";
import TopDeals from "./components/TopDeals";
import Reviews from "./components/Reviews";
import Banner from "./components/Banner";
import TikTok from "./components/TikTok";
import Faq from "./components/Faq";
import clsx from "clsx";

const BackpackerdealsHomepage: FC<BackpackerdealsHomepageProps> = ({ isBackpackerdealsChannel, banners }) => {
  const { lgUp: isDesktop } = useBreakpoints();
  const { quickSearchSecondRow: isQuickSearchFilledFirstRowAndComeToSecondRow } = useQuickSearchBreakpoints();

  return (
    <>
      {isDesktop ? (
        <div className="bg-searchBg pb-30px text-lg mb-5 pt-9 flex items-center justify-center">
          <TrustpilotWidget isSectionPage={true} />
        </div>
      ) : (
        <div
          className={clsx(
            "text-sm font-medium flex justify-center items-center pt-25px lg:hidden",
            isQuickSearchFilledFirstRowAndComeToSecondRow && "mt-10",
          )}
        >
          <span className="mr-15px">🤑 Best price guarantee</span>
          <span>💸 Up to 10% cashback</span>
        </div>
      )}
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <section className="pt-8 pb-16 bg-white">
          <Banner banners={banners} />
          <TikTok />
          <CampervanHire />
          <TopDeals />
          <TrendingDestinations isDesktop={isDesktop} />
          <SeoContent />
          <TravelInspiration />
          {isBackpackerdealsChannel && <Faq />}
          <Reviews />
        </section>
      </div>
    </>
  );
};

export default BackpackerdealsHomepage;
