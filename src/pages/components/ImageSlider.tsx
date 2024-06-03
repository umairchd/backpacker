import { FC, HTMLProps } from "react";
import { ProductImageFragment } from "@@/pages/Product/queries/product-queries.generated";
import { detailSlider } from "../utils/slickSlider";
import Slider from "react-slick";

interface ImageSliderProps {
  slides: ProductImageFragment[];
  isShownModal: () => void;
}

const ImageSlider: FC<HTMLProps<HTMLDivElement> & ImageSliderProps> = ({
  slides,
  children,
  className,
  isShownModal,
}) => {
  return (
    slides && (
      <div className={`w-full h-full m-auto relative overflow-hidden ${className}`}>
        <Slider {...detailSlider}>
          {slides.map((slide) => {
            return (
              <div
                key={slide.title}
                onClick={isShownModal}
                role="button"
                tabIndex={0}
              >
                <div
                  className="w-full h-285px bg-center bg-cover duration-500 bg-no-repeat"
                  style={{
                    backgroundImage: `url(${slide?.image.top480})`,
                  }}
                >
                  {children}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    )
  );
};

export default ImageSlider;
