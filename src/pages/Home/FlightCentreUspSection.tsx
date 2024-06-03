import { useBreakpoints } from "@@/features/utils";
import { CSSProperties, FC } from "react";

import AlwaysHereForYou from "./images/always-here-for-you.png";
import BookYourWayAU from "./images/book-your-way-AU.png";
import DealsForEveryone from "./images/deals-for-everyone.png";
import VeryOwnTravelExpert from "./images/very-own-travel-expert.png";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface ImageLinesProps {
  image: string;
  label: string;
}

interface FlightCentreUspSectionProps {
  isFlightCentre: boolean;
}

const ImageLines: React.FC<ImageLinesProps> = ({ image, label }) => {
  return (
    <li className="flex flex-wrap justify-center items-center lg:justify-center lg:flex-initial lg:w-auto list-none m-0">
      <div className={`sm:mt-4`}>
        <div className="mx-auto mb-2 md:mx-0 md:mb-0">
          <LazyLoadImage
            src={image}
            alt={label}
            width={280}
            className="w-160px max-w-max md:w-180px md:max-w-max lg:w-auto"
          />
        </div>
      </div>
    </li>
  );
};

const FlightCentreUspSection: FC<FlightCentreUspSectionProps> = ({ isFlightCentre }) => {
  const { lgUp: isDekstop, mdUp: isTablet } = useBreakpoints();

  const imageLines = [
    {
      image: VeryOwnTravelExpert.src,
      label: "Your very own travel expert",
    },
    {
      image: DealsForEveryone.src,
      label: "Deals for everyone",
    },
    {
      image: BookYourWayAU.src,
      label: "Book your way",
    },
    {
      image: AlwaysHereForYou.src,
      label: "Always here for you",
    },
  ];
  const mobileGridStyle = {
    "--h-scroll-card-width": "130px",
  } as CSSProperties;

  const desktopGridStyle = {
    "--h-scroll-card-width": "280px",
  } as CSSProperties;

  const tabletGridStyle = {
    "--h-scroll-card-width": "170px",
  } as CSSProperties;

  if (!isFlightCentre) {
    return null;
  }

  return (
    <div className="">
      <h2 className="text-sm md:text-lg md:-mt-3 leading-1.3 text-center">
        When you book with us, you know you’re booking with the best in the business
      </h2>
      {isDekstop ? (
        <ul
          className="grid grid-cols-4 gap-6 justify-content-center pb-4 pt-2"
          style={desktopGridStyle}
        >
          {imageLines.map((t) => {
            return (
              <ImageLines
                key={t.image}
                image={t.image}
                label={t.label}
              />
            );
          })}
        </ul>
      ) : (
        <div className="">
          <ul
            className="grid grid-cols-4 gap-6"
            style={isTablet ? tabletGridStyle : mobileGridStyle}
          >
            {imageLines.map((t) => {
              return (
                <ImageLines
                  key={t.image}
                  image={t.image}
                  label={t.label}
                />
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FlightCentreUspSection;
