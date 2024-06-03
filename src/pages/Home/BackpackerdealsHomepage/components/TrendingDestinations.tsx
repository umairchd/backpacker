import { FC } from "react";
import { trendingDestinationDatas } from "../utils";
import { TrendingDestinationProps, TrendingDestinationTileProps } from "../types";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const TrendingDestinationTile: FC<TrendingDestinationTileProps> = ({ destination, width, height, className }) => {
  return (
    <a
      key={destination.id}
      href={destination.url}
    >
      <OptimizedHeroImage
        src={destination.image}
        alt={`Trending destination in ${destination.title}`}
      />

      <div className={className}>
        <h3 className="text-bae leading-1.3 font-semibold pb-1">{destination.title}</h3>
      </div>
    </a>
  );
};

const TrendingDestinations: FC<TrendingDestinationProps> = ({ isDesktop }) => {
  const trendingTopFive = trendingDestinationDatas.filter((destination) => destination.id >= 2 && destination.id <= 5);

  const trendingTopFour = trendingDestinationDatas.filter((destination) => destination.id >= 6 && destination.id <= 9);

  const contentStyling =
    "text-white bg-trend_main relative bottom-6px left-0 w-full z-2 rounded-bl-md rounded-br-md -mt-31px px-10px pt-5px pb-1px hover:bg-trend_main_hover";

  return (
    <div className="mt-30px mb-15px md:mt-45px">
      <h2 className="text-xl md:text-28px font-bold leading-1.3 mb-5">Trending Destinations</h2>

      {isDesktop ? (
        <div className="trending-section">
          <div className="flex justify-between">
            <div className="w-1/2">
              <div className="trending">
                <a href={trendingDestinationDatas[0].url}>
                  <OptimizedHeroImage
                    src={trendingDestinationDatas[0].image}
                    alt={`Trending destination in ${trendingDestinationDatas[0].title}`}
                  />
                  <div className="text-white bg-trend relative -bottom-5px left-0 w-full z-2 rounded-bl-md rounded-br-md max-1140-py-10px max-1140-px-15px max-1140-mt-153px -mt-183px px-5 py-5 hover:bg-trend_hover">
                    <h3 className="text-28px leading-1.3 font-bold mb-3px">{trendingDestinationDatas[0].title}</h3>
                    <p className="text-base leading-1.5 mb-5">{trendingDestinationDatas[0].description}</p>
                    <span className="text-base leading-1.5 font-semibold">{trendingDestinationDatas[0].textUrl}</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="w-1/2 ml-15px">
              <div className="grid grid-cols-2 gap-15px trending-sub">
                {trendingTopFive.map((destination) => (
                  <TrendingDestinationTile
                    key={destination.id}
                    destination={destination}
                    width="100%"
                    height="auto"
                    className={contentStyling}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="trending-bottom">
            <div className="flex justify-between items-center mt-15px gap-15px">
              {trendingTopFour.map((destination) => (
                <TrendingDestinationTile
                  key={destination.id}
                  destination={destination}
                  width="100%"
                  height="auto"
                  className={contentStyling}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto hide-scrollbar">
          <div className="gap-15px inline-flex justify-center items-center max-w-[1023px]:grid max-w-[1023px]:justify-start max-w-[1023px]:items-start max-w-[1023px]:gap-0">
            {trendingDestinationDatas.map((destination) => (
              <div
                key={destination.id}
                className="trending-item w-180px md:w-265px lg:w-325px lg:h-auto"
              >
                <a
                  href={destination.url}
                  className="hover:text-primary"
                >
                  <OptimizedHeroImage
                    src={destination.image}
                    alt={`Trending destination in ${destination.title}`}
                  />

                  <div className="trending-text">
                    <h3 className="text-base font-semibold leading-1.3 mt-10px">{destination.title}</h3>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingDestinations;
