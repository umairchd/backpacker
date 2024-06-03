import { FC, useEffect } from "react";
import classes from "./CampervanHire.module.scss";
import SearchSection from "./components/SearchSection";
import Partners from "./components/Partners";
import WhyBookWithUs from "./components/WhyBookWithUs";
import WhyCustomersSay from "./components/WhatCustomersSay";
import CtaSection from "./components/CtaSection";
import VerifiedCustomers from "./components/VerifiedCustomers";
import ExperienceVoucher from "./components/ExperienceVoucher";
import PopularRoadTrips from "./components/PopularRoadTrips";
import FAQCampervan from "./components/FAQCampervan";
import RoadTripPlan from "./components/RoadTripPlan";
import Instagram from "./components/Instgram";
import { useCampervanHooks } from "./hooks";
import clsx from "clsx";

export { getServerSideProps } from "./index.page-server";

const CampervanHire: FC = () => {
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
    <div className={classes["campervan-hire-section"]}>
      <SearchSection />

      <div className="container">
        <div className={clsx(classes["section"], "pt-0")}>
          <Partners />
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

export default CampervanHire;
