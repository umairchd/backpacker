import { FC } from "react";
import camperVanClasses from "../CampervanHire.module.scss";
import carRentalClasses from "@@/pages/sites/[site]/[theme]/next/car-rental/CarRental.module.scss";
import IcnTrp5 from "@@/themes/images/svg/icn-trp-stars-5.svg";
import TrustpilotLogo from "@@/themes/images/svg/icn-trustpilot.svg";
import { PartnersProps, partnerDatas as partnerDataCamperVan, partnerDataCarRental } from "../utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TRUST_PILOT_REVIEW_COUNT } from "@@/pages/utils/constants";

const Partners: FC<PartnersProps> = ({ isCarRental = false }) => {
  const classes = isCarRental ? carRentalClasses : camperVanClasses;
  const partnerData = isCarRental ? partnerDataCarRental : partnerDataCamperVan;

  return (
    <div className={classes["partners-section"]}>
      <div className={classes["trustpilot-section"]}>
        <a
          href="https://www.trustpilot.com/review/backpackerdeals.com"
          target="_blank"
          rel="noopener noreferrer"
          title="Trustpilot Reviews"
        >
          <div className={classes["trustpilot-logo"]}>
            <LazyLoadImage
              src={IcnTrp5.src}
              alt="Trustpilot"
              width="100%"
              height="auto"
              effect="opacity"
              className="mr-[10px]"
            />

            <LazyLoadImage
              src={TrustpilotLogo.src}
              alt="Trustpilot"
              width="100%"
              height="auto"
              effect="opacity"
            />
          </div>

          <span>
            <strong>Excellent</strong> based on <strong> {TRUST_PILOT_REVIEW_COUNT} reviews</strong>
          </span>
        </a>
      </div>

      <div className={classes["partner-section"]}>
        {partnerData.map((partner) => (
          <LazyLoadImage
            key={partner.id}
            src={partner.logo.src}
            alt={partner.alt}
            width="100%"
            height="auto"
            effect="opacity"
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
