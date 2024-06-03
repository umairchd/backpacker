"use client";

import { FC } from "react";
import { useClientContext } from "@@/app/lib/ClientInfoProvider";
import { usePhoneNumber } from "@@/pages/hooks/usePhoneNumber";
import { HiMiniPhone } from "react-icons/hi2";
import { LocalPhoneNumberProps } from "./types";

const LocalPhoneNumber: FC<LocalPhoneNumberProps> = ({ isMobile, isYhaChannel }) => {
  const { clientInfo } = useClientContext() ?? {};
  const phoneNumber = usePhoneNumber();

  if (!clientInfo || !phoneNumber) {
    return null;
  }

  return (
    <a
      className="group lg:shadow-box shadow-box sm:h-10 sm:px-4 flex items-center justify-center h-8 gap-3 px-2 no-underline rounded-lg"
      href={`tel:${phoneNumber}`}
      aria-label="Phone number"
    >
      {!isMobile && isYhaChannel && (
        <span
          className="mr-1"
          aria-label="Call Travello"
        >
          Call Travello:{" "}
        </span>
      )}

      <HiMiniPhone className="text-primary lg:text-base text-lg font-medium" />
      <span className="group-hover:text-primary lg:inline hidden text-sm">{!isMobile && phoneNumber}</span>
    </a>
  );
};

export default LocalPhoneNumber;
