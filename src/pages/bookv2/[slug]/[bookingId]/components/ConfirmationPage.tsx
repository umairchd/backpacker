import React from "react";
import find from "lodash/find";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";

import GreenAlertBox from "../../components/GreenAlertBox";
import HeroImage from "@@/pages/components/HeroImage/HeroImage";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import {
  HedgeMode,
  ProductSortOrder,
  useProductSearchQuery,
} from "@@/pages/Product/queries/product-search-queries.generated";
import { getSelectedCurrency } from "@@/features/price/model";
import CustomGlider from "@@/pages/components/CustomGlider/CustomGlider";
import Pane from "@@/pages/components/CustomGlider/Pane";
import ProductCard from "@@/pages/components/ProductCard/ProductCard";
import useBookingConfirmationData from "../../../hooks/useBookingConfirmationData";

import classes from "./ConfirmationPage.module.scss";
import Button from "@@/pages/components/Button";
import { FaRegCalendarDays, FaUser } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";

const ConfirmationPage = () => {
  const { supportedCurrencies, host } = useServerContext();
  const selectedCurrency = useSelector(getSelectedCurrency);

  const { product, booking, bookingContactInfo, bookingPricing } = useBookingConfirmationData();

  const productImage =
    product?.images.productImages.find(({ isMainImage }) => !!isMainImage) || product?.images.productImages[0];
  const originalCurrencyObj = find(supportedCurrencies, {
    isoSymbol: bookingPricing?.currency,
  });

  const { data: topProductsData } = useProductSearchQuery({
    variables: {
      filter: {
        countryUniqueNames: product?.uri.country ? [product.uri.country] : null,
        cityUniqueNames: product?.uri.city ? [product.uri.city] : null,
        categoryUniqueNames: null,
        channelHostFilter: host,
      },
      targetCurrency: selectedCurrency || "AUD",
      sortOrder: ProductSortOrder.TopProduct,
      limit: 3,
      hedgeMode: HedgeMode.None,
    },
    skip: !selectedCurrency || !product,
    ssr: false,
  });

  const formattedDate = `${dayjs(booking?.availabilitySlotKey).format("hh:mma")} on ${dayjs(
    booking?.availabilitySlotKey,
  ).format("ddd, MMM D YYYY")}`;

  const totalPriceString = `${originalCurrencyObj?.symbol}${bookingPricing?.totalOrderPrice.toFixed(2)}`;

  const fareTypesString = bookingPricing?.fareTypesToBook
    .filter((i) => i.numberOfSeats > 0)
    .map((i) => {
      return `${i.numberOfSeats} ${i.resSystemFareTypeId}`;
    })
    .join(", ");

  const popularProducts = topProductsData?.products?.edges?.map((i) => i.node) || new Array(3).fill(null);

  if (!product || !bookingContactInfo) {
    return null;
  }

  return (
    <div className={classes["confirmation-page-content"]}>
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className={classes["green-box-wrapper"]}>
          <GreenAlertBox />
        </div>
        <div className={`white-card ${classes["confirmation-card"]}`}>
          <div className="flex gap-2">
            <FaCheckCircle className={classes["green-check-icon"]} />
            <h1>Your booking is confirmed!</h1>
          </div>
          <div className="grid grid-cols-12 gap-6 justify-center">
            <div className="col-span-12 md:col-span-6">
              <div className="flex">
                <div className={`${classes["product-image-wrapper"]} flex`}>
                  <HeroImage
                    {...{
                      ...productImage.image,
                      id: productImage.productImageId,
                      fileName: productImage.title,
                    }}
                  />
                </div>
                <div className={`${classes["booking-details-block"]} flex`}>
                  <div>
                    <h3>{product.title}</h3>
                    <div>
                      <FaRegCalendarDays />
                      {formattedDate}
                    </div>
                    <div>
                      <FaUser />
                      <span>{fareTypesString}</span>
                    </div>
                  </div>
                  <div>
                    <span>
                      <b>{`Total: ${totalPriceString}`}</b>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6 justify-center">
            <div className="col-span-12 md:col-span-6">
              <div className={`${classes["contact-item"]} grid grid-cols-12 gap-6`}>
                <div className="col-span-12 md:col-span-4">Customer Name</div>
                <div className="col-span-12 md:col-span-8">
                  {`${bookingContactInfo.firstName} ${bookingContactInfo.lastName}`}
                </div>
              </div>
              <div className={`${classes["contact-item"]} grid grid-cols-12 gap-6`}>
                <div className="col-span-12 md:col-span-4">Contact Number</div>
                <div className="col-span-12 md:col-span-8">{bookingContactInfo.phone}</div>
              </div>
              <div className={`${classes["contact-item"]} grid grid-cols-12 gap-6`}>
                <div className="col-span-12 md:col-span-4">Email</div>
                <div className="col-span-12 md:col-span-8">{bookingContactInfo.email}</div>
              </div>
              <div className="flex">
                <p className={classes["confirmation-email-text"]}>
                  A confirmation email and voucher is sent to your email at <b>{bookingContactInfo.email}</b>. If you
                  don&apos;t receive a confirmation email from us, please check your spam or junk folder.
                </p>
              </div>
              <div className="flex">
                <Button
                  variant="primary"
                  className={classes["confirmation-ticket-button"]}
                >
                  Access Confirmation Ticket
                </Button>
              </div>
            </div>
          </div>
          <div className={classes["more-activities-block"]}>
            <h4>{`Explore more activities in ${product.location.city}`}</h4>
            <div className={classes["products-list"]}>
              <div className="-mx-3">
                <CustomGlider>
                  {popularProducts.map((product) => (
                    <Pane
                      className="px-3"
                      key={product?.productId ?? nanoid()}
                    >
                      <ProductCard {...{ data: product }} />
                    </Pane>
                  ))}
                </CustomGlider>
              </div>
            </div>
            <Button
              variant="outline-primary"
              className={classes["explore-more-button"]}
              href={`/${product.uri.country}/${product.uri.city}`}
            >
              Explore more
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
