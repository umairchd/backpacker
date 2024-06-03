import React, { FC, useEffect, useMemo, useRef, useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from "next/router";

import Calendar from "../Calendar/Calendar";
import SlotItem from "../Slots/SlotItem/SlotItem";
import BookNowOverlay from "./BookNowOverlay";
import AvailabilityCalendarSkeleton from "./AvailabilityCalendarSkeleton";

import { AvailabilitySlotFragment, Price } from "@@/features/calendar/queries/availability-query.generated";
import { usePhoneNumber } from "@@/pages/hooks/usePhoneNumber";

import classes from "./AvailabilityCalendar.module.scss";
import { useBreakpoints } from "@@/features/utils";
import { SlotStatusEnum } from "@@/types.generated";
import { getNextAvailableLabel } from "@@/pages/Product/utils";
import { getLocalDateString } from "@@/features/calendar/utils/date";
import { useNextAvailableDateAndPriceFrom } from "@@/pages/Product/hooks/useNextAvailableDateAndPriceFrom";
import { AppDispatch } from "@@/features/store";
import { changeCounter, changeSelectedDate, resetCalendarData } from "@@/features/calendar/model";
import { useCalendar } from "@@/features/calendar/hooks/useCalendar";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { FaMinus, FaPhone, FaPlus } from "react-icons/fa6";
import PriceFromAvailableAt from "@@/features/calendar/components/AvailabilityCalendar/PriceFromAvailableAt";
import { AvailabilityCalendarProps, BookNowOverlayMode } from "./types";

const AvailabilityCalendar: FC<AvailabilityCalendarProps> = ({
  productName,
  productId,
  nextAvailableDate,
  onClose,
  onReload,
  parentRef,
  discount,
  priceFrom,
  priceFromAvailableAt,
}) => {
  const dispatch: AppDispatch = useDispatch();

  const {
    query: { date },
  } = useRouter();

  const phoneNumber = usePhoneNumber();

  useEffect(() => {
    if (date) {
      const convertedDate = dayjs(date as string);
      dispatch(changeSelectedDate(convertedDate.format("YYYY-MM-DD 00:00:00")));
    }
  }, []);

  const updateCounter = (key: string, value: number) => {
    dispatch(changeCounter({ key, value }));
  };

  const {
    availableDates,
    selectedSeats,
    relativeUrl,
    minimumUnitOrder,
    maximumUnitOrder,
    counters,
    selectedDate,
    availableSlotList,
    sortedAvailableSlots,
    selectedDealSlots,
    displayedFareTypes,
    product,
    loading,
    productTimezoneOffset,
    isAvailabilityV2Enabled,
  } = useCalendar(productId);

  const { mdUp: isDesktop } = useBreakpoints();

  //When a date has no availability, auto-scroll down to 'Next Available' section.
  const isNoDeals = () => {
    const noDealsSection = document.getElementById("details-deals");
    if (noDealsSection) {
      noDealsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const bookingContainerRef = useRef(null);

  useEffect(() => {
    if (!isDesktop) {
      if (sortedAvailableSlots && sortedAvailableSlots.length === 0) {
        isNoDeals();
      }
    }
  }, [sortedAvailableSlots]);

  useEffect(() => {
    return () => {
      dispatch(resetCalendarData());
    };
  }, []);

  const filterPrices = (prices) => {
    const filteredPrices = prices
      .filter((prices) => prices.__typename === "TravelloPrice")
      .filter((p) => displayedFareTypes?.includes(p.fareType.typeName));
    let result = [];

    displayedFareTypes.forEach((ft) => {
      const ftPrices = filteredPrices.filter((p) => p.fareType.typeName === ft);

      result = result.concat(ftPrices);
    });

    return result;
  };

  const isSelectedMonthHasAvailableDate = useMemo(() => {
    const selectedMonth = parseInt(selectedDate.format("MM"));
    const selectedYear = parseInt(selectedDate.format("YYYY"));

    return availableDates?.some((date) => {
      const dateMonth = parseInt(dayjs(date.date).format("MM"));
      const dateYear = parseInt(dayjs(date.date).format("YYYY"));

      const hasAvailableSlots =
        date.hasAvailableSlots &&
        date.slots.some((slot) => slot.status === SlotStatusEnum.Available && slot.remainingCount > 0);

      return dateYear === selectedYear && dateMonth === selectedMonth && hasAvailableSlots;
    });
  }, [availableDates, selectedDate]);

  const handleNextAvailableClick = (nextAvailableDateString: string) => {
    dispatch(changeSelectedDate(nextAvailableDateString));
  };

  const [bookNowOverlayMode, setBookNowOverlayMode] = useState(BookNowOverlayMode.Hidden);

  const onBookNow = (mode: BookNowOverlayMode) => {
    setBookNowOverlayMode(mode);
    bookingContainerRef.current.scrollTo(0, 0);
  };

  const onBookNowClose = (mode: BookNowOverlayMode) => {
    setBookNowOverlayMode(BookNowOverlayMode.Hidden);

    if (mode === BookNowOverlayMode.BookedOut) {
      onReload();
    }
  };

  const [fetchMoreAvailableSlotsLoading, setFetchMoreAvailableSlotsLoading] = useState(false);

  const [calendarNextAvailableDate, setCalendarNextAvailableDate] = useState<string | null>(nextAvailableDate);

  const { calculateNextAvailableDate } = useNextAvailableDateAndPriceFrom({
    productId,
    isAvailabilityV2Enabled: isAvailabilityV2Enabled,
  });

  const fetchAndChangeTheSelectedDate = (activeStartDateString: string, activeStartDate: Dayjs) => {
    setFetchMoreAvailableSlotsLoading(true);

    calculateNextAvailableDate(productId, activeStartDate.format("YYYY-MM-DD hh:mm:ss"))
      .then((nextAvailableDateFromFutureDate) => {
        if (nextAvailableDateFromFutureDate) {
          setCalendarNextAvailableDate(nextAvailableDateFromFutureDate);

          const convertedNextAvailableDate = dayjs(nextAvailableDateFromFutureDate);
          const yearMonthConvertedNextAvailableDate = convertedNextAvailableDate.format("YYYYMM");
          const yearMonthActiveStartDate = activeStartDate.format("YYYYMM");

          if (yearMonthActiveStartDate < yearMonthConvertedNextAvailableDate) {
            dispatch(changeSelectedDate(activeStartDateString));
          } else if (yearMonthActiveStartDate > yearMonthConvertedNextAvailableDate) {
            dispatch(changeSelectedDate(nextAvailableDate));
          } else {
            dispatch(changeSelectedDate(nextAvailableDateFromFutureDate));
          }
        } else {
          setCalendarNextAvailableDate(null);
          dispatch(changeSelectedDate(activeStartDateString));
        }
      })
      .catch(() => dispatch(changeSelectedDate(activeStartDateString)))
      .finally(() => setFetchMoreAvailableSlotsLoading(false));
  };

  const onActiveStartDateChange = ({ activeStartDate, view }) => {
    if (view == "month") {
      const convertedActiveStartDate = dayjs(activeStartDate);
      const now = dayjs();
      const nextAvailableDate = getLocalDateString(convertedActiveStartDate < now ? now : convertedActiveStartDate);

      if (!isAvailabilityV2Enabled) {
        dispatch(changeSelectedDate(nextAvailableDate));
        return;
      }

      fetchAndChangeTheSelectedDate(nextAvailableDate, convertedActiveStartDate);
    }
  };

  const onClickMonth = (value: Date) => {
    const startDateOfAMonth = dayjs(value).startOf("date");

    fetchAndChangeTheSelectedDate(value.toISOString(), startDateOfAMonth);
  };

  return (
    <>
      <Transition
        appear
        show={true}
        as={Fragment}
      >
        <Dialog
          ref={parentRef as React.RefObject<HTMLDivElement>}
          as="div"
          className="relative z-40"
          onClose={() => {
            onClose();
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center px-4 pb-4 pt-24 lg:px-4 lg:pb-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-960px transform rounded-lg bg-white text-left align-middle shadow-xl transition-all">
                  <div className="min-w-288px text-center font-bold py-2 px-3 rounded-lg shadow-box text-white absolute z-98 -top-74px left-1/2 -translate-x-1/2">
                    <div className="flex items-center justify-center gap-6px">
                      <FaPhone className="text-base text-primary" />
                      <span className="block">Have a question?</span>
                    </div>
                    Call{" "}
                    <a
                      href={`tel:${phoneNumber}`}
                      className="underline font-bold"
                    >
                      {phoneNumber}
                    </a>
                  </div>
                  <div ref={bookingContainerRef}>
                    <BookNowOverlay
                      mode={bookNowOverlayMode}
                      onClose={onBookNowClose}
                    />

                    <h4 className="text-lg md:text-3xl leading-38px font-bold p-6">Package availability</h4>
                    <button
                      type="button"
                      onClick={() => onClose()}
                      className="h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center outline-none absolute top-6 right-6"
                    >
                      <FiX className="w-7 h-7 text-primary" />
                    </button>

                    {loading || fetchMoreAvailableSlotsLoading ? (
                      <AvailabilityCalendarSkeleton />
                    ) : (
                      <>
                        <div className="px-6 py-4 border-y border-gray-200">
                          <div className="flex flex-col md:flex-row pb-4 lg:pb-0">
                            <div className="basis-2/3">
                              <h5 className="text-base md:text-2xl font-bold text-black mb-3">
                                STEP 1: Select Number of Travellers
                              </h5>
                            </div>
                            <div className="basis-1/3 md:text-right text-[0.8rem]">
                              <PriceFromAvailableAt
                                priceFrom={priceFrom}
                                priceFromAvailableAt={priceFromAvailableAt}
                              />
                            </div>
                          </div>
                          <div className="flex gap-4 items-center flex-col lg:flex-row">
                            {selectedDealSlots?.[0]?.prices.length > 0 ? (
                              filterPrices(selectedDealSlots[0].prices).map((item: Price, index: number) => (
                                <div
                                  key={`${item.fareType.typeName}-${index}`}
                                  className="flex items-center gap-2 w-full lg:w-fit"
                                >
                                  <div className="">{item.fareType.displayName}</div>
                                  <div className="flex items-center ml-auto lg:ml-0">
                                    <button
                                      type="button"
                                      onClick={() => updateCounter(item.fareType.typeName, -1)}
                                      className="h-10 w-12 bg-primary text-white rounded-s-32px flex items-center justify-center"
                                    >
                                      <FaMinus />
                                    </button>
                                    <input
                                      type="text"
                                      className="h-10 w-12 border-y border-inputBorder text-2xl text-center font-bold opacity-100 text-black"
                                      min={1}
                                      value={counters[item.fareType.typeName] || 0}
                                      disabled
                                    />
                                    <button
                                      type="button"
                                      onClick={() => updateCounter(item.fareType.typeName, 1)}
                                      className="h-10 w-12 bg-primary text-white rounded-e-32px flex items-center justify-center"
                                    >
                                      <FaPlus />
                                    </button>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <span>
                                To select the number of passengers and display pricing, please select an available date.
                              </span>
                            )}
                          </div>
                        </div>

                        <div
                          id="details-deals"
                          className="grid grid-cols-12"
                        >
                          <div className="col-span-12 md:col-span-6">
                            <div className={classes["calendar-container"]}>
                              <h5 className="text-base md:text-2xl font-bold text-black p-6">
                                STEP 2: Select Travel Date
                              </h5>
                              {availableDates && (
                                <Calendar
                                  loading={loading}
                                  selectedDate={selectedDate}
                                  availableDates={availableDates}
                                  selectedSeats={selectedSeats}
                                  productTimezoneOffset={productTimezoneOffset}
                                  onActiveStartDateChange={onActiveStartDateChange}
                                  onClickMonth={onClickMonth}
                                />
                              )}
                              <div className="my-2 border-t-2 border-gray-300" />
                            </div>
                          </div>
                          <div className="col-span-12 md:col-span-6 rounded-br-lg rounded-bl-lg overflow-hidden">
                            <div
                              className="bg-lightGray max-h-63vh overflow-auto w-full relative p-4"
                              id="scrollbar"
                            >
                              <h6 className="-mx-4 px-4 pb-3 border-b border-gray-200 text-base font-bold text-black mb-2">
                                {dayjs(selectedDate).format("MMM DD, YYYY")}
                              </h6>
                              <div>
                                {isSelectedMonthHasAvailableDate ? (
                                  sortedAvailableSlots?.map((key: string) => (
                                    <div
                                      key={key}
                                      className=""
                                    >
                                      <p className="text-xs font-bold text-black mb-2">
                                        {key} <span className="">start time</span>
                                      </p>
                                      {availableSlotList[key]?.map((slot: AvailabilitySlotFragment, ind) => (
                                        <SlotItem
                                          key={ind}
                                          slot={slot}
                                          availabilityV2Enabled={isAvailabilityV2Enabled}
                                          tourName={productName}
                                          relativeUrl={relativeUrl}
                                          minimumUnitOrder={minimumUnitOrder}
                                          maximumUnitOrder={maximumUnitOrder}
                                          product={product}
                                          displayedFareTypes={displayedFareTypes}
                                          onClose={onClose}
                                          onBookNow={onBookNow}
                                          discount={discount}
                                        />
                                      ))}
                                    </div>
                                  ))
                                ) : (
                                  <div className="pt-2% h-auto sm:h-1/2 flex flex-col-reverse sm:flex-col items-center justify-center text-center font-semibold">
                                    <p>
                                      We’re sorry, this product currently has no available dates for this month. Please
                                      try another month.
                                    </p>
                                    {calendarNextAvailableDate && (
                                      <>
                                        <button
                                          className={`border-none bg-none underline text-primary font-semibold my-2`}
                                          onClick={() => handleNextAvailableClick(calendarNextAvailableDate)}
                                        >
                                          Next Available Date: <br />
                                          {getNextAvailableLabel(calendarNextAvailableDate)}
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AvailabilityCalendar;
