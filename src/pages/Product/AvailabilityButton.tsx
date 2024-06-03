import React, { FC, useMemo } from "react";

import { useProductActive, useProductAvailable } from "./hooks/hooks";
import { useBookingFlow } from "@@/features/calendar/hooks/useBookingFlow";
import { useDispatch } from "react-redux";
import { changeSelectedDate } from "@@/features/calendar/model";
import { getDateFromNextAvailableDateString } from "@@/features/calendar/utils/nextAvailableDateUtil";
import { AvailabilityButtonProps } from "./types";
import Button from "../components/Button";

const AvailabilityButton: FC<AvailabilityButtonProps> = ({
  availabilityV2Enabled,
  hasVariantProducts,
  nextAvailableDate,
  setCalendarShown,
  bookingRequired,
  bookingUrl,
  priceData,
  isLoading,
  fareTypes,
  priceFrom,
  isMobile,
  status,
  slug,
}) => {
  const { isNewBookingFlowEnabled } = useBookingFlow(availabilityV2Enabled);
  const isActive = useProductActive(status);
  const isProductNotAvailable = useProductAvailable(priceData);
  const dispatch = useDispatch();

  const buttonText = useMemo(() => {
    switch (true) {
      case isLoading && isActive:
        return "Loading Best Price";
      case !!bookingUrl || !bookingRequired:
        return "Book now";
      case !isActive || nextAvailableDate == null:
        return "Not available";
      case hasVariantProducts:
        return "Check Tour Options";
      case priceData && !!priceFrom:
        return "Check availability";
      case isProductNotAvailable || !priceFrom:
        return "Not available";
      default:
        return "Loading Best Price";
    }
  }, [
    isProductNotAvailable,
    hasVariantProducts,
    nextAvailableDate,
    bookingRequired,
    bookingUrl,
    priceData,
    priceFrom,
    isLoading,
    isActive,
  ]);

  const buttonHref = useMemo(() => {
    if (hasVariantProducts) {
      return "#booking-section";
    }

    if (bookingUrl) {
      return bookingUrl;
    } else if (!bookingRequired) {
      //Open dated bookings
      return isNewBookingFlowEnabled ? `/bookv2/${slug}?id=${priceData?.productId}` : `/book/${slug}`;
    }

    return null;
  }, [hasVariantProducts, bookingUrl, bookingRequired, slug, priceData, fareTypes, isNewBookingFlowEnabled]);

  const isDisabled = useMemo(() => {
    if (isLoading) {
      return false;
    }

    if (bookingUrl || !bookingRequired) {
      return false;
    }

    if (nextAvailableDate == null) {
      return true;
    }

    if ((priceData?.availability?.availableDates?.length === 0 || !priceFrom) && !hasVariantProducts) {
      return true;
    }
  }, [priceData, hasVariantProducts, priceFrom, isLoading, nextAvailableDate]);

  const handleAvailabilityButtonClick = (buttonHref: string) => {
    if (buttonHref) {
      return null;
    }

    if (nextAvailableDate) {
      const nextAvailableDateString = getDateFromNextAvailableDateString(nextAvailableDate);

      if (nextAvailableDateString) {
        dispatch(changeSelectedDate(nextAvailableDateString));
      }
    }

    setCalendarShown(true);
  };

  return (
    <Button
      variant={isMobile ? "primary-mobile" : "primary"}
      {...((!isActive || isDisabled) && {
        style: {
          backgroundColor: "#333",
          borderColor: "#333",
        },
      })}
      href={buttonHref}
      onClick={() => handleAvailabilityButtonClick(buttonHref)}
      {...(isLoading
        ? { disabled: true }
        : {
            disabled: !isActive || isDisabled,
          })}
      id={buttonText?.replace(/\s+/g, "") + "Click"}
    >
      {buttonText}
    </Button>
  );
};

export default AvailabilityButton;
