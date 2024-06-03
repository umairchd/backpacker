import { FC } from "react";
import clsx from "clsx";
import { Tooltip } from "@mui/material";
import shield from "@@/themes/images/svg/icon-shield-check.svg";

interface FlexibleBookingProps {
  variant?: "card" | "tooltip";
  className?: string;
}

const FlexibleBooking: FC<FlexibleBookingProps> = ({ variant = "card", className }) => {
  return (
    <div className={clsx(variant === "card" ? `` : className)}>
      {variant === "card" ? (
        <>
          <h3>Flexible booking</h3>
          <p>Book your experience stress-free and know we&apos;re here to help.</p>
        </>
      ) : (
        <Tooltip
          title="If you find a cheaper price, simply contact our support team and we will help you out!"
          placement="bottom-start"
          disableTouchListener
        >
          <div className="flex items-center gap-1">
            <img
              src={shield.src}
              alt=""
              className="w-22px h-22px shrink-0"
            />
            <span className="text-xs font-semibold capitalize">Best Price Guarantee*</span>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default FlexibleBooking;
