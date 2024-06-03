import React, { FC, useState } from "react";
import { PickupDetail } from "@@/pages/Product/queries/product-queries.generated";
import StyledProductCard from "./ProductContent/StyledProductCard";
import classNames from "classnames";

import { PickupLocationProps, PickupLocationsCardProps } from "./types";
import Button from "../components/Button";

const PickupLocation: FC<PickupLocationProps> = (props) => {
  const { pickupDetails, expanded, setExpanded } = props;

  return (
    <>
      <ul className="list-disc mb-4 list-inside">
        {pickupDetails?.slice(0, 5).map((pickupDetail, index) => (
          <li key={pickupDetail.time + index}>
            <span title="Tour start time">{pickupDetail.time} </span>
            {pickupDetail.location}
          </li>
        ))}
        {pickupDetails?.length > 5 && expanded && (
          <div id="pickup-locations">
            {pickupDetails?.slice(5).map((pickupDetail, index) => (
              <li key={5 + pickupDetail.time + index}>
                <span title="Tour start time">{pickupDetail.time} </span>
                {pickupDetail.location}
              </li>
            ))}
          </div>
        )}
      </ul>

      {pickupDetails?.length > 5 && !expanded && (
        <Button
          // variant="link"
          aria-controls="pickup-locations"
          aria-expanded={expanded}
          onClick={() => setExpanded(true)}
        >
          Show all pickup locations
        </Button>
      )}
    </>
  );
};

const PickupLocationsCard: FC<PickupLocationsCardProps> = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { travelInstructions, pickupDetails, variantProducts, isBanner } = props.pickupData;

  const getPickupLocationData = (pickupDetails: PickupDetail[]) => {
    const pickupLocationData = pickupDetails.map((pickup) => {
      const result = pickup.locationTitle.split("|");

      const pickupInfo = { time: "", location: "" };

      if (result.length === 1) {
        pickupInfo.location = result[0];
      } else {
        pickupInfo.time = `${result[1]} - `;
        pickupInfo.location = result[2];
      }

      return pickupInfo;
    });

    return pickupLocationData;
  };

  const pickupDetailsSingle = getPickupLocationData(pickupDetails);

  return (
    <StyledProductCard>
      <h2
        className={classNames(
          "text-base sm:text-2xl font-bold heading mb-5",
          isBanner ? "scroll-mt-230px" : "scroll-mt-200px",
        )}
        style={{
          scrollMarginTop: isBanner ? "230px" : "200px",
        }}
        id="pickup-locations"
      >
        Pickup Locations
      </h2>
      <div className="card-body mt-1 custom_editor">
        {travelInstructions?.text && (
          <div
            dangerouslySetInnerHTML={{
              __html: travelInstructions.text,
            }}
          />
        )}
        <ul>
          {variantProducts?.length > 0 ? (
            variantProducts.map((variant) => {
              const pickupVariantArray = getPickupLocationData(variant.pickupDetails);
              return (
                <div key={variant.productId}>
                  <h3>Tour Option {variant.title}</h3>
                  <PickupLocation
                    pickupDetails={pickupVariantArray}
                    expanded={expanded}
                    setExpanded={setExpanded}
                  />
                </div>
              );
            })
          ) : (
            <PickupLocation
              pickupDetails={pickupDetailsSingle}
              expanded={expanded}
              setExpanded={setExpanded}
            />
          )}
        </ul>
      </div>
    </StyledProductCard>
  );
};

export default PickupLocationsCard;
