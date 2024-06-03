import React, { FC, useContext } from "react";

import DetailsAccordion from "./DetailsAccordion";
import BookingInfoCard from "./BookingInfoCard";
import { BookingPageProductQuery } from "../../hooks/useCommonBookingData.generated";
import useBookingInfo from "../../hooks/useBookingInfo";
import { BookingPageContext } from "./BookingPage";

import classes from "./BookingPage.module.scss";

const RegularBookingPage: FC<
  BookingPageProductQuery & {
    formattedDate: string;
    showErrorPopup: () => void;
    validateBookingAnP: (bookingUid: string) => void;
    toProductDetailPage: () => void;
  }
> = (props) => {
  const { product, currencySymbol } = useContext(BookingPageContext);
  const {
    formattedDate,
    showErrorPopup,
    validateBookingAnP,
    toProductDetailPage,
  } = props;

  const { bookingUid, isExistingBooking, bookingData } = useBookingInfo({
    product,
    showErrorPopup,
  });

  if (!bookingData || !bookingUid) {
    return null;
  }

  return (
    <>
      <div
        className={`${classes["page-flex-container"]} grid grid-cols-12 gap-6`}
      >
        <section className="col-span-12 lg:col-span-8">
          <DetailsAccordion
            bookingUid={bookingUid}
            isExistingBooking={isExistingBooking}
            validateBookingAnP={validateBookingAnP}
          />
        </section>
        <section className="col-span-12 lg:col-span-4">
          <BookingInfoCard
            currencySymbol={currencySymbol}
            bookingUid={bookingUid}
            formattedDate={formattedDate}
            toProductDetailPage={toProductDetailPage}
          />
        </section>
      </div>
    </>
  );
};

export default RegularBookingPage;
