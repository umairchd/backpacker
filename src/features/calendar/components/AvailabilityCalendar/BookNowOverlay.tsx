import { FC, useEffect, useState } from "react";
import { BookNowOverlayMode, BookNowOverlayProps } from "./types";
import dynamic from "next/dynamic";

const AnimationLoading = dynamic(() => import("@@/features/animationLoading/AnimationLoading"), {
  ssr: false,
});

const BookNowOverlay: FC<BookNowOverlayProps> = ({ mode = BookNowOverlayMode.Hidden, onClose }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(mode !== BookNowOverlayMode.Hidden);
  }, [mode]);

  const close = (mode: BookNowOverlayMode) => {
    setShow(false);
    onClose(mode);
  };

  const baseStyle =
    "pt-50px pb-25px bg-white border z-11 rounded-10px shadow-bookingOverlayModal border-bookingOverlayModal flex flex-col items-center justify-center absolute left-0 top-0 right-0 bottom-0 m-auto w-full md:w-528px h-fit";

  return (
    show && (
      <>
        {mode === BookNowOverlayMode.Loading && (
          <div className={baseStyle}>
            <AnimationLoading calendar={true} />
            <span className="mx-5 font-semibold leading-30px text-primary text-center text-bookingOverlay">
              Sit tight, we&apos;re reserving your spot!
            </span>
          </div>
        )}
        {mode === BookNowOverlayMode.BookedOut && (
          <div className={baseStyle}>
            <div
              className="flex items-center justify-center text-primary hover:text-white w-4 h-4 bg-primary absolute top-15px right-15px p-0.7rem text-32px cursor-pointer rounded-3rem"
              onClick={() => {
                close(BookNowOverlayMode.BookedOut);
              }}
            >
              &times;
            </div>
            <span className="mx-5 font-semibold leading-30px text-primary text-center text-bookingOverlay">
              Sorry, this just booked out. Please try another date.
            </span>
          </div>
        )}
        {mode === BookNowOverlayMode.Error && (
          <div className={baseStyle}>
            <div
              className="flex items-center justify-center text-primary hover:text-white bg-primary absolute top-15px right-15px h-4 w-4 p-0.7rem text-32px cursor-pointer rounded-3rem "
              onClick={() => {
                close(BookNowOverlayMode.Error);
              }}
            >
              &times;
            </div>
            <span className="mx-5 font-semibold leading-30px text-primary text-center text-bookingOverlay">
              We encountered an error processing your booking. Please try another date or contact customer support.
            </span>
          </div>
        )}
        <div className="absolute h-full w-full bg-white opacity-70 z-10" />
      </>
    )
  );
};

export default BookNowOverlay;
