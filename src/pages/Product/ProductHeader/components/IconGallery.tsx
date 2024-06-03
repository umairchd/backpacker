import { FC } from "react";
import { IconGalleryProps } from "../types";

import Image from "next/image";
import icnGallery from "@@/themes/images/icn-gallery.svg";

const IconGallery: FC<IconGalleryProps> = ({ countDownVisible = false, countDownLimit, isShownModal }) => {
  const isLastMinuteProduct = countDownVisible && countDownLimit;
  return (
    <div
      className={`absolute z-11 bg-black/60 px-2 py-1 rounded-lg ${
        isLastMinuteProduct ? "bottom-14" : "bottom-4 md:-bottom-41px"
      }  h-9 md:h-10 xs:transform xs:-translate-y-50px right-5 md:left-4 md:right-auto text-white md:text-sm text-xs font-medium flex items-center cursor-pointer w-fit `}
      onClick={isShownModal}
    >
      <Image
        loader={({ src }) => src}
        className="mr-5px"
        src={icnGallery}
        alt="Gallery"
        width={22}
        height={22}
      />
      Gallery
    </div>
  );
};

export default IconGallery;
