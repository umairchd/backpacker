import { FC } from "react";
import { ImageBannerProps } from "../types";
import HeroImage from "@@/pages/components/HeroImage/HeroImage";
import clsx from "clsx";

const ImageBanner: FC<ImageBannerProps> = (props) => {
  const { image, name, onClick, priority = false, loading, className, height, width } = props;

  return (
    <div className={clsx(className, "w-full h-auto md:h-full")} onClick={onClick}>
      <HeroImage {...{ ...image, altText: image.altText ?? name, priority, loading, height, width }} />
    </div>
  );
};

export default ImageBanner;
