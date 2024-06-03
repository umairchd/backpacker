import React, { FC, useState, useContext, Fragment } from "react";
import { useRouter } from "next/router";

import HeroImage from "@@/pages/components/HeroImage/HeroImage";
import useBookingPricing from "../../hooks/useBookingPricing";
import { isAfterpayEnabled } from "@@/pages/components/PriceWidget/utils";
import AfterPayWidget from "@@/pages/components/PriceWidget/AfterpayWidget";
import { BookingPageContext } from "./BookingPage";
import usePromocode from "@@/pages/bookv2/hooks/usePromocode";
import { ProductForBookingFragment } from "@@/pages/bookv2/hooks/useCommonBookingData.generated";
import PromoCodeAlertMessage from "./PromoCodeAlertMessage";

import classes from "./BookingInfoCard.module.scss";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { getSelectedCurrency } from "@@/features/price/model";
import Button from "@@/pages/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import {
  FaBolt,
  FaGift,
  FaRegCalendarDays,
  FaRegClock,
  FaUser,
} from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";

interface BookingInfoCardProps {
  product?: ProductForBookingFragment;
  formattedDate: string;
  currencySymbol: string;
  bookingUid: string;
  toProductDetailPage: () => void;
}

const BookingInfoCard: FC<BookingInfoCardProps> = ({
  product: paymentPageProduct,
  formattedDate,
  currencySymbol,
  bookingUid,
  toProductDetailPage,
}) => {
  const router = useRouter();
  const [modalShown, setModalShown] = useState(false);
  const { paymentOptions, product: bookingProductCommonData } =
    useContext(BookingPageContext);
  const isPaymentPage = router.pathname.includes("payment");
  const selectedCurrency = useSelector(getSelectedCurrency);
  const product = bookingProductCommonData || paymentPageProduct;

  const productImage =
    product.images.productImages.find(({ isMainImage }) => !!isMainImage) ||
    product.images.productImages[0];

  const {
    bookingPricingPromocode,
    fareTypesWithPrices,
    fetchBookingPricing,
    bookingPricingData,
    isCurrencyMatch,
    totalPrice,
  } = useBookingPricing({
    bookingUid: bookingUid,
  });

  const {
    promocode,
    status,
    statusError,
    handlePromocodeChange,
    handleApplyPromocode,
    handleAlertClose,
  } = usePromocode({
    bookingUid: bookingUid,
    fetchBookingPricing,
  });

  const openModal = () => {
    setModalShown(true);
  };

  const closeModal = () => {
    setModalShown(false);
  };

  const tooltipEl = (
    <>
      <p>
        Prices displayed in {selectedCurrency} are indicative only, based on the
        currenct exchange rate.
      </p>
      <p>
        The total amount shown is the amount that you will be charged upon
        submitting payment.
      </p>
    </>
  );

  const innerElements = (
    <div className={classes["booking-info-card"]}>
      <div>
        <HeroImage
          {...{
            ...productImage.image,
            id: productImage.productImageId,
            fileName: productImage.title,
            alt: productImage.title,
          }}
        />
        <div className={classes["product-image-dimmer"]}>
          <div>{product.title}</div>
          <div className={classes["product-details-trigger-buttons"]}>
            <Button variant="primary" onClick={openModal}>
              View details
            </Button>
            <Button variant="outline-primary" onClick={openModal}>
              <FaGift />
              Promo code
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className={classes["booking-extra-details"]}>
          <div className={classes["product-subtitle"]}>{product.title}</div>
          <div>
            <FaRegCalendarDays />
            {formattedDate}
            {!isPaymentPage && (
              <span
                className={classes["edit-button"]}
                onClick={toProductDetailPage}
              >
                Edit
              </span>
            )}
          </div>
          <div>
            <FaUser />
            {bookingPricingData?.bookingPricing?.fareTypesToBook.map(
              (ft, ind) => (
                <span key={ft.resSystemFareTypeId}>
                  <b>{ft.numberOfSeats}</b> {ft.resSystemFareTypeId}
                  {ind + 1 !==
                  bookingPricingData.bookingPricing.fareTypesToBook.length
                    ? ", "
                    : " "}
                </span>
              )
            )}
          </div>
          {product?.duration && (
            <div>
              <FaRegClock />
              {product?.duration?.label}
            </div>
          )}
          {product.instantConfirmation && (
            <div>
              <FaBolt />
              Instant confirmation
            </div>
          )}
          <hr />
          {!isPaymentPage && (
            <>
              <div className={classes["gift-label"]}>
                <FaGift />
                Promo code
              </div>
              <div className="flex">
                <input
                  placeholder="Promo code"
                  aria-label="Promo code"
                  aria-describedby="basic-addon2"
                  value={promocode}
                  onChange={handlePromocodeChange}
                />
                <Button
                  variant="primary"
                  id="button-addon2"
                  onClick={handleApplyPromocode}
                >
                  Apply
                </Button>
                {status !== null && (
                  <PromoCodeAlertMessage
                    promocode={promocode}
                    handleAlertClose={handleAlertClose}
                    statusMessage={
                      status ? "successfully applied!" : statusError
                    }
                    status={status}
                  />
                )}
              </div>
            </>
          )}
          <div className={classes["prices-block"]}>
            {fareTypesWithPrices?.map((i) => (
              <div key={i.label}>
                <span>{i.label}</span>
                <span>{i.price}</span>
              </div>
            ))}
            {bookingPricingPromocode.isPromocodeApplied && (
              <div className={classes["promocode-applyed"]}>
                <span>{bookingPricingPromocode?.promocode?.name}</span>
                <span className={classes["promocode-savings"]}>
                  -
                  {`${currencySymbol}${bookingPricingPromocode?.promocode?.discountAmount}`}
                </span>
              </div>
            )}
          </div>
          <hr />
        </div>
        <div className={classes["total-block"]}>
          <span>Total</span>
          <span>
            {totalPrice}

            {!isCurrencyMatch && (
              <Tooltip
                title={tooltipEl}
                placement="bottom-start"
                className={classes["total-tooltip"]}
              >
                <FaInfoCircle />
              </Tooltip>
            )}
          </span>

          {product?.legacy?.isDisplayAfterpay &&
            paymentOptions &&
            isAfterpayEnabled(
              bookingPricingData?.bookingPricing?.totalOrderPrice,
              product?.legacy?.priceFrom?.currencyCode,
              currencySymbol,
              paymentOptions?.afterpay,
              product?.legacy?.isDisplayAfterpay
            ) && (
              <AfterPayWidget
                {...{
                  currencyIsoSymbol: currencySymbol,
                  amount: bookingPricingData.bookingPricing.totalOrderPrice,
                  afterpay: paymentOptions.afterpay,
                }}
              />
            )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Transition appear show={modalShown} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`${classes["booking-info-modal"]} w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all`}
                >
                  <span
                    className={classes["booking-info-modal-close-btn"]}
                    onClick={closeModal}
                  >
                    &#x2715;
                  </span>
                  {innerElements}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {innerElements}
    </>
  );
};

export default BookingInfoCard;
