import React, { FC, useState, useEffect, useMemo, useContext, FormEvent } from "react";
import dayjs from "dayjs";

import HeroImage from "@@/pages/components/HeroImage/HeroImage";
import CounterInput from "@@/pages/components/CounterInput/CounterInput";
import { useContactDetailsForm } from "./forms";
import { contactDetailsDefaultValues } from "./DetailsAccordion";
import ContactDetailsForm from "./ContactDetailsForm";
import PageFooter from "./PageFooter";
import GreenAlertBox from "./GreenAlertBox";
import { ContactDetailsFormData } from "../../types";
import useOpenDatedBooking from "../../hooks/useOpenDatedBooking";
import { isAfterpayEnabled } from "@@/pages/components/PriceWidget/utils";
import AfterPayWidget from "@@/pages/components/PriceWidget/AfterpayWidget";
import { BookingPageContext } from "./BookingPage";
import classes from "./OpenDatedBookingCard.module.scss";
import bookingCardClasses from "./BookingInfoCard.module.scss";
import { getFareTypesPrices } from "@@/pages/Product/utils";
import { usePriceData } from "@@/pages/Product/hooks/usePriceData";
import { FaRegCalendarDays } from "react-icons/fa6";

interface OpenDatedBookingCardProps {
  showErrorPopup: () => void;
  validateBookingAnP: (bookingUid: string) => void;
}

const OpenDatedBookingCard: FC<OpenDatedBookingCardProps> = ({ showErrorPopup, validateBookingAnP }) => {
  const { paymentOptions, product, currencySymbol, currencyRounding } = useContext(BookingPageContext);

  const { priceData, fareTypes } = usePriceData(product?.productId, false);

  const fareTypePrices = useMemo(() => getFareTypesPrices(priceData, fareTypes, true), [priceData, fareTypes]);

  const [fareTypesCounts, setFareTypeCounts] = useState<{
    [key: string]: number;
  }>({});

  const productImage =
    product?.images.productImages.find(({ isMainImage }) => !!isMainImage) || product?.images.productImages[0];

  useEffect(() => {
    if (fareTypes) {
      const initialState = {};

      fareTypes.forEach((f, ind) => {
        initialState[f.id] = ind === 0 ? 1 : 0;
      });

      setFareTypeCounts(initialState);
    }
  }, [fareTypes]);

  const contactDetailsFormData = useContactDetailsForm(contactDetailsDefaultValues);

  const { onSubmit } = useOpenDatedBooking({
    productId: product?.productId,
    fareTypesCounts,
    showErrorPopup,
    fareTypePrices,
    priceData,
  });

  const {
    formState: { isValid: isContactDetailsFormValid },
  } = contactDetailsFormData;

  const fareTotals = useMemo(() => {
    return fareTypePrices
      ?.map((ft, ind) => {
        const count = fareTypesCounts[ft.id];
        if (!count) return null;

        const fareTypeName = ft.displayName;
        const fareTypePriceValue = fareTypePrices[ind].value;
        const fareTypePriceTotal = fareTypePriceValue * count;

        const fareTypePriceValueDisplay = fareTypePriceValue.toFixed(currencyRounding);
        const fareTypePriceTotalDisplay = fareTypePriceTotal.toFixed(currencyRounding);

        return {
          label: `${currencySymbol}${fareTypePriceValueDisplay} X ${count} ${fareTypeName}`,
          value: `${currencySymbol}${fareTypePriceTotalDisplay}`,
        };
      })
      .filter((i) => !!i);
  }, [fareTypePrices, fareTypesCounts]);

  const totalPrice: string = useMemo(() => {
    if (!fareTypePrices?.length) {
      return "0";
    }

    return fareTypePrices
      ?.map((p, ind) => p.value * fareTypesCounts[fareTypePrices[ind].id])
      .reduce((a, b) => a + b)
      .toFixed(currencyRounding);
  }, [fareTypePrices, fareTypesCounts]);

  const totalPriceLabel: string = useMemo(() => {
    return `${currencySymbol}${totalPrice}`;
  }, [currencySymbol, totalPrice]);

  const onContactDetailsSubmit: (e?: FormEvent) => Promise<any> = async (e) => {
    e?.preventDefault();
    let res = null;

    await contactDetailsFormData.handleSubmit(async (formData) => {
      contactDetailsFormData.reset(formData, { keepDirty: false });
      res = formData;
    })();

    return res;
  };

  const onFormsSubmit = async () => {
    const contactDetails: ContactDetailsFormData = await onContactDetailsSubmit();

    if (contactDetails) {
      onSubmit(contactDetails);
    } else {
      showErrorPopup();
    }
  };

  return (
    <div className={classes["open-dated-page-wrapper"]}>
      <GreenAlertBox />
      <div className={classes["open-dated-booking-info-card"]}>
        <div>
          <h2 className={classes["product-name"]}>{product?.title}</h2>
          <div
            className={`${classes["available-until"]} relative p-4 mb-4 text-warningT rounded-md bg-warningBg border border-warninBorder`}
          >
            <FaRegCalendarDays />
            <span>
              This ticket is valid 3 years from now. Expire on{" "}
              <b>{dayjs().add(3, "years").format("dddd, DD MMMM YYYY")}</b>
            </span>
          </div>
          <div className={classes["info-details"]}>
            <div>
              <div className={classes["image-wrapper"]}>
                <HeroImage
                  {...{
                    ...productImage.image,
                    id: productImage.productImageId,
                    fileName: productImage.title,
                  }}
                />
                <div className={classes["product-image-dimmer"]}>
                  <h2>{product?.title}</h2>
                </div>
              </div>
              <div className={classes["counters"]}>
                {Object.keys(fareTypesCounts).map((key, ind) => (
                  <>
                    {fareTypePrices[ind] && (
                      <div
                        key={key}
                        className={classes["counter-row"]}
                      >
                        <div>{fareTypePrices[ind]?.displayName}</div>
                        <div>
                          <CounterInput
                            id={"" + fareTypePrices[ind]?.id}
                            value={fareTypesCounts[key]}
                            onChange={(value, id) =>
                              setFareTypeCounts({
                                ...fareTypesCounts,
                                [id]: value,
                              })
                            }
                          />
                        </div>
                        <div>
                          {currencySymbol}
                          {(fareTypePrices[ind]?.value * fareTypesCounts[key]).toFixed(currencyRounding)}
                        </div>
                      </div>
                    )}
                  </>
                ))}
              </div>
            </div>
            <div>
              <div className={`${bookingCardClasses["booking-info-card"]} ${classes["price-info-card"]}`}>
                <div>
                  <div>
                    <div className={bookingCardClasses["prices-block"]}>
                      {fareTotals?.map((i) => (
                        <div key={i.label}>
                          <span>{i.label}</span>
                          <span>{i.value}</span>
                        </div>
                      ))}
                    </div>
                    <hr />
                  </div>
                  <div className={bookingCardClasses["total-block"]}>
                    <span>Total</span>
                    <span>{totalPriceLabel}</span>
                    {product?.legacy?.isDisplayAfterpay &&
                      paymentOptions &&
                      isAfterpayEnabled(
                        parseFloat(totalPrice),
                        product?.legacy?.priceFrom?.currencyCode,
                        currencySymbol,
                        paymentOptions?.afterpay,
                        product?.legacy?.isDisplayAfterpay,
                      ) && (
                        <AfterPayWidget
                          {...{
                            currencyIsoSymbol: currencySymbol,
                            amount: parseFloat(totalPrice),
                            afterpay: paymentOptions.afterpay,
                          }}
                        />
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={classes["contact-details-card"]}>
        <div className={classes["contact-details-card-body"]}>
          <h3 className={classes["contact-details-title"]}>Contact details</h3>
          <ContactDetailsForm
            formData={contactDetailsFormData}
            noNextButton={true}
            onSubmit={onContactDetailsSubmit}
          />
        </div>
      </div>
      <PageFooter
        isButtonDisabled={!isContactDetailsFormValid}
        onSubmit={onFormsSubmit}
        buttonText="Continue to Payment"
      />
    </div>
  );
};

export default OpenDatedBookingCard;
