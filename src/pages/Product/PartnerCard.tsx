import React, { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import StyledProductCard from "@@/pages/Product/ProductContent/StyledProductCard";
import { PartnerCardProps } from "./types";

const PartnerCard: FC<PartnerCardProps> = ({ partner, address, isBanner }) => {
  return (
    <StyledProductCard>
      <div className="white-card">
        <h2
          className="mt-8 text-base sm:text-2xl font-bold mb heading mb-5"
          style={{
            scrollMarginTop: isBanner ? "230px" : "200px",
          }}
          id="tour-operator"
        >
          Tour Operator
        </h2>
        <div>
          <div>
            <strong>{partner.name}</strong>
          </div>
          {!!address && <div>{address}</div>}
          {partner.companyLogo && (
            <div className="max-w-500px">
              <LazyLoadImage
                src={partner.companyLogo.top480}
                altText={partner.name}
                effect="opacity"
              />
            </div>
          )}
        </div>
      </div>
    </StyledProductCard>
  );
};

export default PartnerCard;
