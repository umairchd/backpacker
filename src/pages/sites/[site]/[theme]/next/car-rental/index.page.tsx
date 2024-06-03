import { FC, useEffect } from "react";
import classes from "../campervan-hire/CampervanHire.module.scss";
import carRentalClasses from "@@/pages/sites/[site]/[theme]/next/car-rental/CarRental.module.scss";
import SearchSection from "../campervan-hire/components/SearchSection";
import Partners from "../campervan-hire/components/Partners";
import WhyBookWithUs from "../campervan-hire/components/WhyBookWithUs";
import WhyCustomersSay from "../campervan-hire/components/WhatCustomersSay";
import CtaSection from "../campervan-hire/components/CtaSection";
import VerifiedCustomers from "../campervan-hire/components/VerifiedCustomers";
import ExperienceVoucher from "../campervan-hire/components/ExperienceVoucher";
import PopularRoadTrips from "../campervan-hire/components/PopularRoadTrips";
import FAQCampervan from "../campervan-hire/components/FAQCampervan";
import RoadTripPlan from "../campervan-hire/components/RoadTripPlan";
import Instagram from "../campervan-hire/components/Instgram";
import { useCampervanHooks } from "../campervan-hire/hooks";
import clsx from "clsx";
import { CAR_RENTAL } from "@@/pages/utils/constants";

export { getServerSideProps } from "./index.page-server";

const CarRentalSearch: FC = () => {
  const { isCampervanHirePage } = useCampervanHooks();

  useEffect(() => {
    if (!isCampervanHirePage) {
      window.location.href = "/";
    }
  }, [isCampervanHirePage]);

  if (!isCampervanHirePage) {
    return null;
  }

  return (
    <div className={`${classes["campervan-hire-section"]} ${carRentalClasses["car-rental-section"]}`}>
      <SearchSection vehicleType={CAR_RENTAL} />

      <div className="container">
        <div className={clsx(carRentalClasses["section"], "pt-0")}>
          <Partners isCarRental={true} />
          <WhyBookWithUs />
        </div>
      </div>

      <WhyCustomersSay />
      <CtaSection />
      <VerifiedCustomers />
      <ExperienceVoucher />
      <PopularRoadTrips />
      <FAQCampervan />
      <RoadTripPlan />
      <Instagram />
    </div>
  );
};

export default CarRentalSearch;
