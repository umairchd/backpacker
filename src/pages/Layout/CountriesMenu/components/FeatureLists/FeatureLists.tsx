import { FC } from "react";
import CoverCard from "../../../../components/CoverCard/CoverCard";
import FeatureMenuEmpty from "@@/themes/images/feature-menu-empty.jpg";
import { FeatureCityCardProps } from "../../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FeatureLists: FC<FeatureCityCardProps> = ({ features }) => {
  return (
    <div className="flex pb-4 gap-2 md:flex-col mt-4 1139px:mt-0">
      {features.map((city) => {
        return (
          <div
            key={city.uniqueName}
            className="block"
          >
            <a
              href={city.uri?.url}
              className="block no-underline"
            >
              <CoverCard className="max-1139-w-140 max-1139-h-140 p-6 flex items-center justify-center w-165px h-165px rounded-lg relative text-white overflow-hidden transition-all duration-200 ease-in bg-cover bg-no-repeat hover:shadow-hoverDealCard">
                <picture className="absolute inset-0 z-0">
                  <LazyLoadImage
                    src={city.image?.top480 ?? FeatureMenuEmpty.src}
                    alt={city?.name}
                    width="100%"
                    height="100%"
                    className="object-cover w-full h-full"
                    effect="opacity"
                  />
                </picture>
                <div className="text-center z-2 font-semibold text-xs sm:text-base">{city?.name}</div>
              </CoverCard>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default FeatureLists;
