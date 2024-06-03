import { FC } from "react";
import { GiveawayBannerProps } from "../types";

import clsx from "clsx";
import OptimizedHeroImage from "../../HeroImage/OptimizedHeroImage";

const GiveawayBanner: FC<GiveawayBannerProps> = ({ src, alt, className }) => {
  if (!src) return null;

  return (
    <div className={clsx(["my-8 giveawayBanner", className])}>
      <OptimizedHeroImage
        src={src}
        alt={alt}
        priority={true}
      />
    </div>
  );
};

export default GiveawayBanner;
