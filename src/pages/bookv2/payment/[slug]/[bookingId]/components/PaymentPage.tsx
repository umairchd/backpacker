import React, { useEffect, useMemo, useState, useRef, Fragment } from "react";
import { TbLoader2 } from "react-icons/tb";

import { useRouter } from "next/router";
import gql from "graphql-tag";
import { getCountryListMap } from "country-flags-dial-code";
import find from "lodash/find";

import GreenAlertBox from "@@/pages/bookv2/[slug]/components/GreenAlertBox";
import { useCommonBookingData } from "@@/pages/bookv2/hooks/useCommonBookingData";
import BookingInfoCard from "@@/pages/bookv2/[slug]/components/BookingInfoCard";
import PageFooter from "@@/pages/bookv2/[slug]/components/PageFooter";
import usePaymentPricing from "../hooks/usePaymentPricing";
import useTracking from "../../../../../lib/useTracking";
import { useBookingStatusLazyQuery, useCompleteBookingMutation } from "./PaymentPage.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { BookingStatus } from "@@/types.generated";
import classes from "./PaymentPage.module.scss";
import { useForm } from "react-hook-form";
import { FIELDS } from "@@/pages/bookv2/types";
import BrainTreeDropin from "./BraintreeDropIn";
import Button from "@@/pages/components/Button";
import { Dialog, Transition } from "@headlessui/react";
import { FaShieldAlt } from "react-icons/fa";
import { FaRegFaceSurprise } from "react-icons/fa6";

gql`
  mutation CreatePaymentToken($userId: ID) {
    createPaymentToken(userId: $userId) {
      value
      type
    }
  }

  query BookingStatus($bookingUid: String) {
    booking(bookingUid: $bookingUid) {
      bookingStatus
    }
  }

  mutation CompleteBooking($bookingUid: String, $paymentToken: String!) {
    completeBooking(bookingUid: $bookingUid, paymentToken: $paymentToken)
  }
`;

type CountryInfoItem = {
  country: string;
  code: string;
  dialCode: string;
};

// TODO: Add and expose allowed payment methods in graphQL

const PaymentPage = () => {
  const braintreeRef = useRef(null);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [show, setShow] = useState(false);
  const [createBookingFailed, setCreateBookingFailed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completeBooking] = useCompleteBookingMutation();
  const [getStatus, { data: status }] = useBookingStatusLazyQuery({
    fetchPolicy: "no-cache",
  });
  const { track } = useTracking();
  const [countryCode, setCountryCode] = useState("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>();

  const router = useRouter();
  const { supportedCurrencies } = useServerContext();
  const { formattedDate, product } = useCommonBookingData();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm();

  const originalCurrencyObj = useMemo(() => {
    return find(supportedCurrencies, {
      isoSymbol: product?.legacy?.priceFrom?.currencyCode || "AUD",
    });
  }, [product, supportedCurrencies]);

  const bookingString = router.query.bookingid;
  let bookingUid: string;

  if (typeof bookingString == "string") {
    bookingUid = bookingString;
  } else {
    console.error("Cannot Parse Booking UID");
  }

  const { totalPrice, currency } = usePaymentPricing({
    bookingUid: bookingUid,
    status: status?.booking?.bookingStatus,
  });

  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);

  const countryList: Array<CountryInfoItem> = Object.values(getCountryListMap());

  const onBraintreeInit = (error, braintreeInstance) => {
    if (braintreeInstance) {
      braintreeInstance.on("paymentMethodRequestable", function ({ paymentMethodIsSelected }) {
        if (!paymentMethodIsSelected) {
          setButtonDisabled(false);
        }
      });

      braintreeInstance.on("changeActiveView", function ({ previousViewId, newViewId }) {
        if (previousViewId === newViewId) {
          return;
        }

        switch (newViewId) {
          case "card":
            setButtonDisabled(false);
            break;
          default:
            setButtonDisabled(true);
        }
      });

      braintreeRef.current = braintreeInstance;
    }
  };

  const onSubmit = () => {
    const braintreeInstance = braintreeRef?.current;

    if (!braintreeInstance) {
      return;
    }

    setButtonDisabled(true);

    braintreeInstance.requestPaymentMethod(
      {
        threeDSecure: {
          amount: totalPrice,
          billingAddress: {
            countryCodeAlpha2: countryCode,
          },
          vault: {
            vaultCard: false,
          },
        },
      },
      (error, payload) => {
        if (error || status?.booking?.bookingStatus !== "CREATED") {
          setButtonDisabled(false);
        } else {
          try {
            setIsSubmitting(true);
            const paymentMethodNonce = payload.nonce;
            completeBooking({
              variables: {
                bookingUid: bookingUid,
                paymentToken: paymentMethodNonce,
              },
            })
              .then(() => {
                // Poll Booking Status
                clearInterval(intervalRef.current);
                intervalRef.current = setInterval(fetchStatus, 3000);
              })
              .catch((error: unknown) => {
                handleOpen();
                setIsSubmitting(false);
                setButtonDisabled(false);
              });
          } catch (error) {
            handleOpen();
            setIsSubmitting(false);
            setButtonDisabled(false);
          }
        }
      },
    );
  };

  const handleCountrySelect = (value) => {
    trigger(FIELDS.COUNTRY_CODE, { shouldFocus: true });
    setCountryCode(value);
  };

  const fetchStatus = () => {
    try {
      getStatus({ variables: { bookingUid: bookingUid } });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  // Check for Booking Status Update
  useEffect(() => {
    if (!braintreeRef.current) {
      return;
    }

    const bookingStatus = status?.booking.bookingStatus;

    switch (bookingStatus) {
      case BookingStatus.Completed:
        clearInterval(intervalRef.current);
        braintreeRef.current.teardown();
        // Send to Confirmation Page
        router.push(`/bookv2/${router.query.slug as string}/${bookingUid}`);

        /**
         * TODO: The payload should be refined with the event and ecommerce payload
         *       Please refer the implementation on bpd-v2 repo
         *       - booking_confirm.html.twig - Line: 313
         *       - booking_payment.html.twig - Line: 641
         */
        track("purchase");
        track("paymentValid");

        break;
      case BookingStatus.CreateBookingFailed:
        clearInterval(intervalRef.current);
        setCreateBookingFailed(true);
        setIsSubmitting(false);
        setButtonDisabled(false);
        break;
      case BookingStatus.Failed:
      case BookingStatus.QuoteBookingFailed:
      case BookingStatus.AuthorizePaymentFailed:
      case BookingStatus.UnknownError:
      case BookingStatus.SettlePaymentFailed:
      case BookingStatus.FinishBookingFailed:
        clearInterval(intervalRef.current);
        handleOpen();
        setIsSubmitting(false);
        setButtonDisabled(false);
        track("invalidPayment");
        break;
    }
  }, [status?.booking.bookingStatus]);

  if (!product) {
    return null;
  }

  return (
    <div className={classes["booking-page-content"]}>
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className={`${classes["page-flex-container"]} grid grid-cols-12 gap-6`}>
          <section className="col-span-12 lg:col-span-8">
            <GreenAlertBox />
            <div>
              <h3 className={classes["secureHeader"]}>
                {" "}
                <FaShieldAlt />
                Payment
              </h3>
              <p className={classes["secureMessage"]}>
                We use secure transmission & encrypted storage to protect your information
              </p>
              {isSubmitting ? (
                <div className={classes["loading-spinner"]}>
                  <TbLoader2
                    size={32}
                    className="animate-spin text-inherit w-8 h-8 inline-block"
                  />
                  <p>
                    Please don&apos;t close this tab<br></br> your booking is being processed...
                  </p>
                </div>
              ) : (
                <>
                  <div>
                    <div className="mb-5 form-group">
                      <label
                        htmlFor="country"
                        className="required text-left"
                      >
                        Country
                      </label>
                      <select
                        {...register(FIELDS.COUNTRY_CODE, {
                          required: true,
                          onChange(event) {
                            handleCountrySelect(event.target.value);
                          },
                        })}
                        required
                        placeholder="Country of Residence"
                      >
                        <option value="">Please Select a Country</option>
                        {countryList.map((countryItem) => {
                          return (
                            <option
                              key={countryItem.code}
                              value={countryItem.code}
                            >
                              {countryItem.country}
                            </option>
                          );
                        })}
                      </select>
                      {errors[FIELDS.COUNTRY_CODE] && (
                        <span className="text-red-500 text-xs">Please Select a Country</span>
                      )}
                    </div>
                  </div>
                  <BrainTreeDropin
                    productName={product?.title}
                    currency={currency}
                    totalPrice={totalPrice}
                    onInit={onBraintreeInit}
                  />
                </>
              )}
              <Transition
                appear
                show={show}
                as={Fragment}
              >
                <Dialog
                  as="div"
                  className="relative z-50"
                  onClose={handleClose}
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
                          className={`${classes["error-modal"]} w-full text-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`}
                        >
                          <FaRegFaceSurprise className={classes["modal-svg"]} />
                          <h4>Uh-oh! Payment Failed.</h4>
                          <p>We suggest you try other payment options or try the booking process again.</p>
                          <p>
                            If payment fails again, try contacting your credit card issuing bank. <br></br>Sometimes
                            they put a hold on a card if used overseas.
                          </p>
                          <Button onClick={handleClose}>Try another payment option</Button>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
              <Transition
                appear
                show={createBookingFailed}
                as={Fragment}
              >
                <Dialog
                  as="div"
                  className="relative z-50"
                  onClose={() => {}}
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
                          className={`${classes["error-modal"]} w-full text-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all`}
                        >
                          <FaRegFaceSurprise className={classes["modal-svg"]} />
                          <h4>Uh-oh! We can&apos;t process your booking.</h4>
                          <p>You can try booking the product again or contact customer support.</p>
                          <Button
                            onClick={() => {
                              setCreateBookingFailed(false);
                            }}
                          >
                            Ok
                          </Button>
                        </Dialog.Panel>
                      </Transition.Child>
                    </div>
                  </div>
                </Dialog>
              </Transition>
            </div>
            <PageFooter
              isButtonDisabled={buttonDisabled}
              onSubmit={handleSubmit(onSubmit)}
              buttonText="Confirm & Pay"
            />
          </section>
          <section className="col-span-12 lg:col-span-8">
            <BookingInfoCard
              product={product}
              currencySymbol={originalCurrencyObj?.symbol}
              bookingUid={bookingUid}
              formattedDate={formattedDate}
              toProductDetailPage={() => {
                console.info();
              }}
            />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
