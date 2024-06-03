import { useMemo, FC, useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { getCounters } from "@@/features/calendar/model";
import {
  AvailabilitySlotFragment,
  SlotStatusEnum,
  useAvailabilityV2LazyQuery,
} from "@@/features/calendar/queries/availability-query.generated";
import { ProductDiscountAmountFragment, ProductFragment } from "@@/pages/Product/queries/product-queries.generated";
import Price from "@@/pages/components/PriceWidget/PriceWidget";

import { useBookingFlow } from "@@/features/calendar/hooks/useBookingFlow";
import { BookNowOverlayMode } from "@@/features/calendar/components/AvailabilityCalendar/types";
import Image from "next/image";

interface SlotItemProps {
  slot: AvailabilitySlotFragment;
  tourName: string;
  available?: boolean;
  relativeUrl: string | null | undefined;
  minimumUnitOrder: number | undefined | null;
  maximumUnitOrder: number | undefined | null;
  product: ProductFragment;
  displayedFareTypes: string[];
  availabilityV2Enabled: boolean;
  onClose: (href: string) => void;
  onBookNow: (mode: BookNowOverlayMode) => void;
  discount?: ProductDiscountAmountFragment[];
}

const SlotItem: FC<SlotItemProps> = ({
  slot,
  tourName,
  available,
  relativeUrl,
  minimumUnitOrder,
  maximumUnitOrder,
  product,
  displayedFareTypes,
  availabilityV2Enabled,
  onClose,
  onBookNow,
  discount,
}) => {
  const router = useRouter();
  const counters = useSelector(getCounters);
  const [selectedPaxNumber, setSelectedPaxNumber] = useState<number>(0);
  const [showMinimumOrderErrorMessage, setShowMinimumOrderErrorMessage] = useState<boolean>(false);
  const [showMaximumOrderErrorMessage, setShowMaximumOrderErrorMessage] = useState<boolean>(false);
  const [fareTypeErrorMessage, setFareTypeErrorMessage] = useState<string>("");
  const { isNewBookingFlowEnabled } = useBookingFlow(availabilityV2Enabled);
  const [getAvailability] = useAvailabilityV2LazyQuery();
  const [isBooking, setIsBooking] = useState(false);

  const checkSlotAvailability = async () => {
    onBookNow(BookNowOverlayMode.Loading);

    const tourDate = dayjs(date).format();
    const result = await getAvailability({
      fetchPolicy: "no-cache",
      variables: {
        input: {
          productId: product.productId,
          startDate: tourDate,
          endDate: tourDate,
          ignoreCache: true,
        },
        targetCurrency: product?.legacy?.priceFrom?.currencyCode,
        fareTypesFilter: {
          showHidden: false,
          productId: product.productId,
        },
      },
    });

    const slots = result?.data.availability.slots;
    const dateFormat = "YYYY-MM-DD HH:mm";

    if (slots) {
      const slot = slots.find(
        (slot) => dayjs(tourDate).format(dateFormat) === dayjs(slot.startTimeLocal).format(dateFormat),
      );

      return slot?.hasAvailableSlots;
    }

    return false;
  };

  const { remainingCount, isLastMinute, prices, status, startTime, date } = slot;

  const getFareTypeOfRecommendedRetailPrice = (fareType: string) => {
    return prices.find((p) => p.__typename === "RecommendedRetailPrice" && p.fareType.typeName === fareType);
  };

  const getSelectedCountByFareType = (fareType: string) => {
    const fareTypeRrp = getFareTypeOfRecommendedRetailPrice(fareType);
    const seatUsed = fareTypeRrp && "seatUsed" in fareTypeRrp ? fareTypeRrp.seatUsed : 1;

    return counters[fareType] ? counters[fareType] * seatUsed : 0;
  };

  const selectedCount = useMemo(() => {
    return displayedFareTypes.reduce((acc, curr) => {
      acc += getSelectedCountByFareType(curr);
      return acc;
    }, 0);
  }, [counters, prices, minimumUnitOrder, maximumUnitOrder]);

  const isSlotDisabled = useMemo(() => {
    if (status !== SlotStatusEnum.Available) return true;

    return selectedCount > remainingCount || selectedCount === 0;
  }, [remainingCount, startTime, date, status, selectedCount]);

  const priceReduceCallback = (acc, curr) => {
    if (counters[curr.fareType.typeName] && curr.value.convertedAmount)
      return acc + curr.value.convertedAmount * counters[curr.fareType.typeName];
    return acc;
  };

  const tourPrice = useMemo(() => {
    return prices.filter((p) => p.__typename === "TravelloPrice").reduce(priceReduceCallback, 0);
  }, [counters, prices]);

  const productRecommendedRetailPrice = useMemo(() => {
    return product.legacy?.recommendedRetailPrice?.convertedAmount;
  }, [product]);

  const shouldDisplaySavePrice = useMemo(() => {
    return discount && discount.length > 0 && tourPrice > 0 && productRecommendedRetailPrice > 0;
  }, [discount, productRecommendedRetailPrice, tourPrice]);

  const totalSavePrice = useMemo(() => {
    if (!shouldDisplaySavePrice) {
      return null;
    }

    const totalSavingReduceCallback = (acc, curr) => {
      if (counters[curr.fareType.typeName] && curr.totalSaving?.convertedAmount)
        return acc + curr.totalSaving?.convertedAmount * counters[curr.fareType.typeName];
      return acc;
    };

    return prices.filter((price) => price.__typename === "TravelloPrice").reduce(totalSavingReduceCallback, 0);
  }, [shouldDisplaySavePrice, prices, counters]);

  const isBookingAllowed = useMemo(() => {
    setSelectedPaxNumber(selectedCount);
    setShowMinimumOrderErrorMessage(false);
    setShowMaximumOrderErrorMessage(false);
    setFareTypeErrorMessage("");

    if (minimumUnitOrder && selectedCount < minimumUnitOrder) {
      setShowMinimumOrderErrorMessage(true);
      return false;
    }

    if (maximumUnitOrder && selectedCount > maximumUnitOrder) {
      setShowMaximumOrderErrorMessage(true);
      return false;
    }

    displayedFareTypes.forEach((fareType) => {
      const fareTypeRrp = getFareTypeOfRecommendedRetailPrice(fareType);
      const selectedCountByFareType = getSelectedCountByFareType(fareType);

      if (selectedCountByFareType === 0) {
        return true;
      }

      if (fareTypeRrp && fareTypeRrp["minimumUnitOrder"] && selectedCountByFareType < fareTypeRrp["minimumUnitOrder"]) {
        setFareTypeErrorMessage(
          `⚠️ Minimum of ${fareTypeRrp["minimumUnitOrder"]} "${fareTypeRrp?.fareType.displayName}" are required for this booking.` +
            "\n" +
            `Add ${fareTypeRrp["minimumUnitOrder"] - selectedCountByFareType} or more to continue.`,
        );

        return false;
      }

      if (fareTypeRrp && fareTypeRrp["maximumUnitOrder"] && selectedCountByFareType > fareTypeRrp["maximumUnitOrder"]) {
        setFareTypeErrorMessage(
          `⚠️ Maximum of ${fareTypeRrp["maximumUnitOrder"]} ${fareTypeRrp?.fareType.displayName} are allowed for this booking.` +
            "\n" +
            `Remove ${selectedCountByFareType - fareTypeRrp["maximumUnitOrder"]} or more to continue.`,
        );

        return false;
      }
    });

    return true;
  }, [counters, prices, minimumUnitOrder, maximumUnitOrder, selectedCount]);

  const dateString = useMemo(() => {
    return slot.date.substr(0, slot.date.indexOf(slot.date.includes("T") ? "T" : " "));
  }, [slot]);

  const rateIds = useMemo(() => {
    return displayedFareTypes.reduce((acc, curr, index) => {
      const slotWithRateId = slot.prices.find((p) => p.fareType.typeName === curr);

      if (slotWithRateId && "rateId" in slotWithRateId) {
        acc += `&p${index + 1}-rate-id=${slotWithRateId["rateId"]}`;
      }

      return acc;
    }, "");
  }, [displayedFareTypes, slot]);

  const bookNow = useCallback(() => {
    if (!isBookingAllowed || isBooking) {
      return;
    }

    setIsBooking(true);

    const personsQuery = displayedFareTypes.reduce((acc, curr, index) => {
      acc += `&p${index + 1}=${counters[curr] ? counters[curr] : 0}`;
      return acc;
    }, "");

    const pricesQuery = displayedFareTypes.reduce((acc, curr, index) => {
      acc += `&p${index + 1}-price=${slot.prices.find((p) => p.fareType.typeName === curr)?.value.amount || 0}`;
      return acc;
    }, "");

    const contactInfoUrl = `/book/${relativeUrl}?slot=${slot.slotId}&date=${dateString}${personsQuery}${pricesQuery}${rateIds}`;

    if (!availabilityV2Enabled) {
      window.location.href = contactInfoUrl;
      return;
    }

    checkSlotAvailability()
      .then((isAvailable) => {
        if (isAvailable) {
          window.location.href = contactInfoUrl;
        } else {
          setIsBooking(false);
          onBookNow(BookNowOverlayMode.BookedOut);
        }
      })
      .catch(() => {
        setIsBooking(false);
        onBookNow(BookNowOverlayMode.Error);
      });
  }, [relativeUrl, counters, slot, isBookingAllowed]);

  const bookNowV2 = useCallback(() => {
    if (!isBookingAllowed || isBooking) {
      return;
    }

    setIsBooking(true);

    const personsQuery = displayedFareTypes.reduce((acc, curr) => {
      acc += `&ft=${counters[curr] || 0}`;
      return acc;
    }, "");

    const fareTypeIdQuery = displayedFareTypes.reduce((acc, curr) => {
      acc += `&ft-id=${encodeURIComponent(curr)}`;
      return acc;
    }, "");

    const fareTypeBookingIdQuery = displayedFareTypes.reduce((acc, curr) => {
      const bookingId = slot.prices.find((p) => p.fareType.typeName === curr)?.fareType["bookingId"];
      acc += `&ft-booking-id=${bookingId}`;
      return acc;
    }, "");

    const productId = product?.productId;

    const href = `/bookv2/${relativeUrl}?slot=${slot.slotId}&date=${dateString}${rateIds}${personsQuery}${fareTypeBookingIdQuery}${fareTypeIdQuery}&id=${productId}`;

    const isShallow = router.pathname.includes("/bookv2/");

    checkSlotAvailability()
      .then((isAvailable) => {
        if (isAvailable) {
          router.push(href, href, { shallow: isShallow });

          if (isShallow) {
            onClose(href.split("?")[1]);
          }
        } else {
          setIsBooking(false);
          onBookNow(BookNowOverlayMode.BookedOut);
        }
      })
      .catch(() => {
        setIsBooking(false);
        onBookNow(BookNowOverlayMode.Error);
      });
  }, [relativeUrl, counters, slot, isBookingAllowed, product]);

  const levyCurrencyCode = useMemo(() => {
    return prices.find((p) => p.__typename === "Levy")?.value.currencyCode;
  }, [prices]);

  const levyAmount = useMemo(() => {
    return prices
      .filter((p) => p.__typename === "Levy")
      .reduce((acc, curr) => {
        if (counters[curr.fareType.typeName]) return acc + curr.value.amount * counters[curr.fareType.typeName];
        return acc;
      }, 0)
      .toFixed(2);
  }, [prices, counters]);

  const hasLevy = useMemo(() => {
    return parseFloat(levyAmount) > 0 && prices.some((p) => p.__typename === "Levy") && tourPrice > 0;
  }, [prices, tourPrice, levyAmount]);

  const levyLabels = useMemo(() => {
    const result = prices
      .filter((p) => p.__typename === "Levy" && p.value?.amount > 0)
      .reduce((acc, curr) => {
        if (counters[curr.fareType.typeName] && curr.__typename === "Levy")
          return acc + (curr.label ? `${curr.label}, ` : "");
        return acc;
      }, "");

    return result || "fee,";
  }, [counters, prices]);

  return (
    <div
      className={`flex flex-col relative w-full pt-6 px-4 pb-4 mb-4 bg-white text-xs shadow-slotItem rounded-lg ${
        isLastMinute && "mt-6"
      } ${remainingCount > 0 ? "" : "border border-slotBorder bg-slotBg shadow-none"} ${
        isSlotDisabled && "border border-slotBorder bg-slotBg shadow-none"
      } ${router.query.slot === slot.slotId && "border-3 border-primary"}`}
    >
      {isLastMinute && (
        <div
          className={`absolute flex items-center justify-center text-white -top-4 h-7 left-0 py-0.5 px-2 font-medium rounded-sm shadow-label bg-lastMinute lm-deal-indicator`}
        >
          Last Minute Deal
        </div>
      )}

      {remainingCount > 0 && remainingCount <= 20 && (
        <div
          className={`flex items-center justify-center absolute h-6 text-primary text-10px -top-3 bg-white right-3 px-2 uppercase rounded shadow-slotItem two-pops`}
        >
          Only {remainingCount} Left
        </div>
      )}

      <h5 className="text-base font-bold text-black mb-4">{tourName}</h5>

      {available && (
        <div className="flex items-center justify-between border-y border-slotBorder py-15px mb-15px text-15px">
          Available times:{" "}
          <select
            id="time"
            name="time"
            className="w-65% h-35px border border-slotBorder rounded-5px py-3px px-10px"
          >
            <option value="">Select a time</option>
          </select>
        </div>
      )}

      {showMinimumOrderErrorMessage ? (
        <div className="bg-darkRed text-white p-10px my-10px font-semibold whitespace-pre-wrap">
          ⚠️ Minimum of {minimumUnitOrder} people are required for this booking.
          <br />
          Add {minimumUnitOrder ? minimumUnitOrder - selectedPaxNumber : 0} or more to continue.
        </div>
      ) : null}

      {showMaximumOrderErrorMessage ? (
        <div className="bg-darkRed text-white p-10px my-10px font-semibold whitespace-pre-wrap">
          ⚠️ Maximum of {maximumUnitOrder} people are allowed for this booking.
          <br />
          Remove {maximumUnitOrder ? selectedPaxNumber - maximumUnitOrder : null} or more to continue.
        </div>
      ) : null}

      {!!fareTypeErrorMessage ? (
        <div className="bg-darkRed text-white p-10px my-10px font-semibold whitespace-pre-wrap">
          {fareTypeErrorMessage}
        </div>
      ) : null}

      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="">
          <Price
            variant="bold"
            amount={parseFloat(tourPrice.toFixed(2))}
            originalCurrencyIsoSymbol={product?.legacy?.priceFrom?.currencyCode}
            size="sm"
          />
          {totalSavePrice > 0 && (
            <span className="text-xs font-bold text-lightGreen flex items-center gap-1">
              <Image
                loader={({ src }) => src}
                src="/imagesv3/flying_cash.png"
                alt="flying cash"
                loading="eager"
                className="w-6 h-6 object-cover inline-block"
                width={24}
                height={24}
              />
              Save{" "}
              <Price
                variant="bold"
                amount={parseFloat(totalSavePrice.toFixed(2))}
                originalCurrencyIsoSymbol={product?.legacy?.priceFrom?.currencyCode}
              />
            </span>
          )}
        </div>
        {remainingCount > 0 ? (
          <button
            type="button"
            className="text-white uppercase rounded-full h-9 outline-none bg-primary border border-primary w-full max-w-160px flex items-center justify-center text-base font-bold disabled:opacity-50"
            disabled={
              isSlotDisabled ||
              showMinimumOrderErrorMessage ||
              showMaximumOrderErrorMessage ||
              !!fareTypeErrorMessage ||
              selectedPaxNumber > remainingCount ||
              !tourPrice
            }
            onClick={isNewBookingFlowEnabled ? bookNowV2 : bookNow}
          >
            BOOK NOW
          </button>
        ) : (
          <button className="border-2 border-redC font-semibold text-redC w-100px h-30px">SOLD OUT</button>
        )}
      </div>
      {hasLevy && (
        <div className="bg-noteBg mt-4 p-3 rounded-bl-lg rounded-br-lg">
          <span className="font-bold text-noteT">Note: </span>
          <span>
            {`This tour has a ${levyCurrencyCode} ${levyAmount} ${levyLabels} It is `}
            <strong>not</strong>
            {" included in the price and is payable to the supplier on the day."}
          </span>
        </div>
      )}
    </div>
  );
};

export default SlotItem;
