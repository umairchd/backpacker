import { FC } from "react";
import TrustpilotLogo from "@@/themes/images/svg/icn-trustpilot.svg";
import IcnTrp0 from "@@/themes/images/svg/icn-trp-stars-0.svg";
import IcnTrp1 from "@@/themes/images/svg/icn-trp-stars-1.svg";
import IcnTrp15 from "@@/themes/images/svg/icn-trp-stars-1.5.svg";
import IcnTrp2 from "@@/themes/images/svg/icn-trp-stars-2.svg";
import IcnTrp25 from "@@/themes/images/svg/icn-trp-stars-2.5.svg";
import IcnTrp3 from "@@/themes/images/svg/icn-trp-stars-3.svg";
import IcnTrp35 from "@@/themes/images/svg/icn-trp-stars-3.5.svg";
import IcnTrp4 from "@@/themes/images/svg/icn-trp-stars-4.svg";
import IcnTrp45 from "@@/themes/images/svg/icn-trp-stars-4.5.svg";
import IcnTrp5 from "@@/themes/images/svg/icn-trp-stars-5.svg";
import { TRUST_PILOT_REVIEW_COUNT } from "@@/pages/utils/constants";

interface TrustpilotWidgetProps {
  isSectionPage?: boolean;
}

const TrustpilotWidget: FC<TrustpilotWidgetProps> = ({ isSectionPage = false }) => {
  const getIcon = (rating: number) => {
    if (rating >= 4.8) return IcnTrp5?.src;
    if (rating >= 4.3) return IcnTrp45?.src;
    if (rating >= 3.7) return IcnTrp4?.src;
    if (rating >= 3.3) return IcnTrp35?.src;
    if (rating >= 2.8) return IcnTrp3?.src;
    if (rating >= 2.3) return IcnTrp25?.src;
    if (rating >= 1.8) return IcnTrp2?.src;
    if (rating >= 1.3) return IcnTrp15?.src;
    if (rating >= 1.0) return IcnTrp1?.src;
    return IcnTrp0?.src;
  };

  // Change this value to show the rating
  const fillRating = 4.8;

  const imgRating = (
    <img
      src={getIcon(fillRating)}
      alt={`Trustpilot ${fillRating} stars`}
      width={100}
      height={20}
      className="mx-2 inline-block"
    />
  );

  const ratingFormatted = fillRating % 1 === 0 ? `${fillRating}.0` : fillRating;

  if (isSectionPage) {
    return (
      <div className="whitespace-nowrap overflow-hidden text-ellipsis">
        <span>
          Our Customers Have Rated Us <b>Excellent</b> {imgRating}
          {ratingFormatted} out of 5 based on {TRUST_PILOT_REVIEW_COUNT} reviews{" "}
          <img
            src={TrustpilotLogo?.src}
            alt="Trustpilot"
            width={100}
            height={20}
            loading="lazy"
            className="mx-2 inline-block mb-6px"
          />
        </span>
      </div>
    );
  }

  return (
    <a
      href="https://www.trustpilot.com/review/backpackerdeals.com"
      target="_blank"
      rel="noreferrer"
      className="flex items-center md:justify-start justify-center whitespace-nowrap space-x-10px overflow-hidden text-ellipsis text-sm font-medium leading-5 text-center text-black cursor-pointer hover:text-orange-500"
    >
      <img
        src={TrustpilotLogo?.src}
        alt="Trustpilot"
        width={100}
        height={20}
        loading="lazy"
        className="mx-2 mb-2 hidden small-screen:inline-block"
      />

      {imgRating}
      <span className="md:font-semibold font-normal">{ratingFormatted}</span>
    </a>
  );
};

export default TrustpilotWidget;
