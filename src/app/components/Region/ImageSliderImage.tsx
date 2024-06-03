import { PropsWithChildren, use } from "react";
import Pane from "@@/pages/components/CustomGlider/Pane";
import getOptimizedImageForImageSlider from "@@/app/data/getOptimizedImageForImageSlider";

function ImageSliderImage({ src, alt }: PropsWithChildren<{ src: string; alt: string }>) {
  const transformImage = use(getOptimizedImageForImageSlider(src));

  if (transformImage) {
    return (
      <Pane className="ml-0 md:ml-4 px-3">
        <div className="relative h-320px">
          <picture className="block absolute inset-0">
            <img
              className="w-full h-full object-cover rounded-lg"
              src={transformImage.small1400}
              alt={alt}
              loading="lazy"
              width={408}
              height={320}
            />
          </picture>
        </div>
      </Pane>
    );
  }

  return (
    <Pane className="ml-0 md:ml-4 px-3">
      <div className="relative h-320px" />
    </Pane>
  );
}

export default ImageSliderImage;
