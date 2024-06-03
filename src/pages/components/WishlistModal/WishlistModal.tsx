import React, { FC, useState, useMemo, Fragment } from "react";

import { useLocalStorage } from "react-use";
import { addDays } from "date-fns";
import { useRouter } from "next/router";
import DatePickerComponent from "../../components/DatePicker/DatePicker";
import { useWishlistForm } from "./hooks";
import { FIELDS, WishlistFormData, WishlistModalProps, WishlistModalSuccessProps } from "./types";
import HeroImage from "@@/pages/components/HeroImage/HeroImage";
import { getConvertedDate } from "@@/app/components/ContactUs/utils";
import { postIterableEventTrack } from "@@/pages/utils/iterableEventTrack";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";

import trackWishList from "./utils/trackWishList";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

const defaultValues: WishlistFormData = {
  [FIELDS.EMAIL]: "",
  [FIELDS.DATE]: new Date(),
};

const WishlistModalSuccess: FC<WishlistModalSuccessProps> = ({ subtitle, image, setIsOpen }) => {
  return (
    <>
      <h3 className="text-28px font-bold text-black mb-4 text-center">Thank you!</h3>
      {subtitle && (
        <h5 className="text-base text-center leading-1.5 mb-8">
          You&apos;ve added this tour to your wishlist <br />
          {subtitle}
        </h5>
      )}
      <HeroImage {...{ ...image?.image, altText: subtitle }} />
      <h5 className="text-lg leading-1.5 font-normal text-center mt-4">We will send you a reminder email.</h5>
      <button
        type="button"
        className="h-38px rounded-full text-white bg-primary font-bold outline-none px-3 py-6px flex mx-auto mt-3"
        onClick={() => setIsOpen(false)}
      >
        Close
      </button>
    </>
  );
};

const WishlistModal: FC<WishlistModalProps> = ({ id, subtitle, image, location, price, iterableKey, currencyCode }) => {
  const { asPath } = useRouter();
  const { shareASaleExpiryDays, host } = useServerContext();
  const [isOpen, setIsOpen] = useState(false);
  const [wishlist, setWishlist] = useLocalStorage<string[]>("wishlist", []);

  const {
    dateField,
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useWishlistForm(defaultValues);

  const isInWishList = useMemo(() => Array.isArray(wishlist) && wishlist.includes(id), [wishlist, id]);

  const shareASaleCookieExpiryDate = addDays(new Date(), parseInt(shareASaleExpiryDays, 10)).toISOString();

  const wishlistTrackData = (data: WishlistFormData) => {
    const convertedDate = getConvertedDate(data[FIELDS.DATE]);

    const wishlistSet = new Set([...wishlist, id]);
    const wishlistArr = Array.from(wishlistSet);
    setWishlist(wishlistArr);

    trackWishList(
      data[FIELDS.EMAIL],
      convertedDate,
      {
        id,
        name: subtitle,
        url: host + asPath,
        imageUrl: image?.image["top1024"],
      },
      shareASaleCookieExpiryDate,
    );
  };

  const onSubmit = handleSubmit(async (data: WishlistFormData) => {
    const iterableDatas = {
      user: {
        email: data[FIELDS.EMAIL],
        dataFields: {
          signupSource: "addToWishlist",
          emailVerified: false,
        },
      },
      event: {
        email: data[FIELDS.EMAIL],
        eventName: "addToWishlist",
        dataFields: {
          productId: id,
          productName: subtitle,
          productLocationCity: location?.city,
          productLocationCountry: location?.country,
          productCurrencyCode: currencyCode,
          productPrice: price,
          productUrl: host + asPath,
          productImage: image?.image["top1024"],
        },
      },
    };

    try {
      const addToWishlist = await postIterableEventTrack(iterableDatas, iterableKey);

      if (addToWishlist.code === "Success") {
        wishlistTrackData(data);
      }
    } catch (error) {
      alert("Something went wrong, please try again later");
    }
  });

  const contentEl = (
    <span>
      By adding this product to your wishlist, you are joining our mailing list. By subscribing, you agree to our{" "}
      <a
        href="/terms-and-conditions"
        target="_blank"
        className="font-medium underline hover:text-primary"
        rel="noreferrer"
      >
        Terms and Conditions
      </a>{" "}
      and{" "}
      <a
        href="/privacy-policy"
        target="_blank"
        className="font-medium underline hover:text-primary"
        rel="noreferrer"
      >
        Privacy Policy
      </a>
      . You can opt out at any time.
    </span>
  );

  return (
    <>
      <div
        className={`text-base font-semibold cursor-pointer text-primary flex justify-center items-center bg-white p-3 rounded-lg ${
          isInWishList ? "pointer-events-none cursor-default" : ""
        }`}
        onClick={() => setIsOpen(true)}
        id="AddToWishlistClick"
      >
        {isInWishList ? <FaHeart /> : <FaRegHeart />}
      </div>
      <Transition
        appear
        show={isOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
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
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <button
                    type="button"
                    className="shrink-0 h-10 w-10 rounded-md hover:bg-gray-100 flex items-center justify-center outline-none absolute top-5 right-5"
                    onClick={() => setIsOpen(false)}
                  >
                    <FiX className="w-7 h-7 text-primary" />
                  </button>
                  {isInWishList ? (
                    <WishlistModalSuccess
                      image={image}
                      subtitle={subtitle}
                      setIsOpen={setIsOpen}
                    />
                  ) : (
                    <>
                      <h3 className="text-28px font-bold text-black mb-4 text-center">Add to wishlist</h3>
                      {subtitle && <h5 className="text-base text-center leading-1.5 mb-8">{subtitle}</h5>}
                      <HeroImage {...{ ...image?.image, altText: subtitle }} />
                      <form className="mt-4">
                        <div
                          className="form-group"
                          hidden
                        >
                          <label
                            htmlFor="date"
                            className="text-xs font-bold mb-2 block leading-4"
                          >
                            Remind me on date
                          </label>
                          <DatePickerComponent
                            value={dateField.value}
                            minDate={new Date()}
                            showPreviousMonths={false}
                            error={!!errors[FIELDS.DATE]}
                            dateFormat="dd/MM/yyyy"
                            onChange={dateField.onChange}
                          />
                          {errors[FIELDS.DATE] && <span className="text-red-500 text-xs">Must be a future date</span>}
                        </div>
                        <div className="form-group">
                          <label
                            htmlFor="email"
                            className="required-label relative text-xs font-bold mb-2 inline-block leading-4"
                          >
                            Your email
                          </label>
                          <input
                            {...register(FIELDS.EMAIL)}
                            placeholder="jane@adventures.com"
                            className="shadow-box bg-white w-full text-sm placeholder:text-gray-500 rounded-lg h-10 flex items-center gap-2 overflow-hidden px-2 ring-theme outline-primary placeholder:font-light"
                          />
                          {errors[FIELDS.EMAIL] && (
                            <span className="text-red-500 text-xs">{errors[FIELDS.EMAIL].message}</span>
                          )}
                        </div>
                      </form>
                      <div className="mt-5 flex justify-end mb-2">
                        <button
                          type="submit"
                          className="h-38px rounded-full text-white bg-primary font-bold outline-none px-3 py-6px"
                          disabled={isSubmitting}
                          onClick={onSubmit}
                          id="WishlistFormID"
                        >
                          {isSubmitting ? <div className="spinner" /> : "Add to Wishlist"}
                        </button>
                      </div>
                      <div className="text-xs mt-1 form-group">{contentEl}</div>
                    </>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default WishlistModal;
