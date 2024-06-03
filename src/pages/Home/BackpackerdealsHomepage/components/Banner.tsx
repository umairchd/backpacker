import { FC } from "react";
import { nanoid } from "nanoid";
import { BannerProps } from "../types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Slider from "react-slick";

const Banner: FC<BannerProps> = ({ banners }) => {
  if (!banners) return null;

  const settings = {
    dots: false,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return banners.map((b) => (
    <div
      className="1470px:-mx-20"
      key={nanoid()}
    >
      <div className="sm:-mx-4 md:h-full">
        <Slider {...settings}>
          {b.images.map((image) => (
            <div
              key={image.id}
              className="px-1 md:px-4"
            >
              <a
                href={b.link}
                className="overflow-hidden block rounded-lg md:h-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="w-full object-cover h-full rounded-lg relative flex gap-2">
                  <LazyLoadImage
                    className="w-full h-full object-cover object-center"
                    id="HomepageBannerClick"
                    src={image.bannerTop1400}
                    alt={image.altText}
                    width="100%"
                    height="100%"
                    effect="opacity"
                  />
                </div>
              </a>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  ));
};

export default Banner;
