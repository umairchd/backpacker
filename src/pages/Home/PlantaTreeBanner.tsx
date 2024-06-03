import { useBreakpoints } from "@@/features/utils";
import clsx from "clsx";
import { FC, useMemo } from "react";
import { useServerContext } from "../lib/ServerContextProvider";
import OptimizedHeroImage from "../components/HeroImage/OptimizedHeroImage";

interface PlantATreeBannerProps {
  classNames?: string;
}

const PlantaTreeBanner: FC<PlantATreeBannerProps> = ({ classNames }) => {
  const { lgUp: isDesktop } = useBreakpoints();
  const { host } = useServerContext();

  const srcDekstop = "https://assets.backpackerdeals.com/uploads/content/plantatree/plant-a-tree-banner-dekstop.jpg";
  const srcMobile = "https://assets.backpackerdeals.com/uploads/content/plantatree/plant-a-tree-banner-mobile.jpg";

  const linkBanner = useMemo(() => {
    if (host?.includes("backpackerdeals")) {
      return "https://www.backpackerdeals.com/blog/book-go-plant-grow/";
    }
    return "/sustainable-tours";
  }, [host]);

  const src = isDesktop ? srcDekstop : srcMobile;

  return (
    <div className={clsx("pt-6 pb-10 bg-white flex items-center justify-center", classNames)}>
      <div className="max-w-1320px px-3 sm:px-6 mx-auto w-full">
        <a
          href={linkBanner}
          target="_blank"
          rel="noreferrer"
          className="block"
        >
          <OptimizedHeroImage
            src={src}
            alt="Plant a tree Banner"
            className="w-full h-full object-cover"
            priority={false}
          />
        </a>
      </div>
    </div>
  );
};

export default PlantaTreeBanner;
