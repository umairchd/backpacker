import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import carRentalClasses from "@@/pages/sites/[site]/[theme]/next/car-rental/CarRental.module.scss";
import SearchWidget from "./SearchWidget";
import { isEqualStrings } from "@@/pages/utils/stringUtils";
import {
  BANNER_IMAGE,
  BANNER_IMAGE_MOBILE,
  BANNER_SUB_TITLE,
  BANNER_TITLE,
  BANNER_TITLE_END_HIGHLIGHT,
  CAMPERVAN,
  CAMPERVAN_TRAVELLO,
  CAR_RENTAL,
} from "@@/pages/utils/constants";
import RoaverWidget from "@@/pages/components/RoaverWidget/RoaverWidget";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";
import { useCampervanHooks } from "@@/pages/sites/[site]/[theme]/next/campervan-hire/hooks";

type SearchSelectionType = {
  vehicleType?: typeof CAMPERVAN | typeof CAR_RENTAL;
};

type PageTypeParams = {
  isCamperVanPage: boolean;
  isTravelloCampervanPage: boolean;
};

const getPageType = ({ isCamperVanPage, isTravelloCampervanPage }: PageTypeParams) => {
  switch (true) {
    case isTravelloCampervanPage:
      return CAMPERVAN_TRAVELLO;
    case isCamperVanPage:
      return CAMPERVAN;
    default:
      return CAR_RENTAL;
  }
};

const CarRentalSearch: FC = () => (
  <div className={carRentalClasses["car-rental-search-widget"]}>
    <RoaverWidget dataType="search" />
  </div>
);

const CamperVanSearch: FC = () => (
  <div className={classes["search-widget"]}>
    <SearchWidget src="client-search-widget" />
  </div>
);

const SearchSection: FC<SearchSelectionType> = ({ vehicleType = CAMPERVAN }) => {
  const isCamperVanPage = isEqualStrings(vehicleType, CAMPERVAN);
  const { isTravelloCampervanPage } = useCampervanHooks();
  const pageType = getPageType({ isCamperVanPage, isTravelloCampervanPage });
  const bannerImage = BANNER_IMAGE[pageType];
  const bannerImageMobile = BANNER_IMAGE_MOBILE[pageType];
  const bannerTitle = BANNER_TITLE[pageType];
  const bannerTitleEndHighlight = BANNER_TITLE_END_HIGHLIGHT[pageType];
  const bannerSubTitle = BANNER_SUB_TITLE[pageType];

  return (
    <div
      className={`${classes["search-section"]} ${
        !isCamperVanPage ? carRentalClasses["search-section-car-rental"] : ""
      }`.trim()}
    >
      <div className={classes["background"]}>
        <div className={classes["background-overlay"]} />
        <OptimizedHeroImage
          src={bannerImage}
          alt="Campervan Hire"
        />

        <OptimizedHeroImage
          className={classes["img-mobile"]}
          src={bannerImageMobile}
          alt="Campervan Hire"
        />
      </div>

      <div className={classes["search-section-content"]}>
        <div className={classes["search-heading"]}>
          <h1>
            {bannerTitle} <span>{bannerTitleEndHighlight}</span>
          </h1>
          <p>{bannerSubTitle}</p>
        </div>
        {isCamperVanPage ? <CamperVanSearch /> : <CarRentalSearch />}
      </div>
    </div>
  );
};

export default SearchSection;
