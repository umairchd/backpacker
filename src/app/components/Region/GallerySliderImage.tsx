import { PropsWithChildren, use } from "react";
import Pane from "@@/pages/components/CustomGlider/Pane";

import clsx from "clsx";
import getOptimizedImageForGalleryCard from "@@/app/data/getOptimizedImageForGalleryCard";

/**
 * Multiple resolution Image Pane with title/content
 * Glider needs a Pane with a key for each image, so wrap image with a Pane
 */
function GallerySliderImage({
  children,
  src,
  alt,
}: PropsWithChildren<{
  src: string;
  alt: string;
}>) {
  const transformImage = use(getOptimizedImageForGalleryCard(src));

  if (transformImage) {
    return (
      <Pane key={transformImage.id}>
        <div className="picture-background">
          <img
            src={transformImage.top3000}
            alt={alt}
            className="w-full h-full object-fill"
          />
          <div
            className={clsx(
              "gallerySlider absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-800px",
            )}
          >
            {children}
          </div>
        </div>
      </Pane>
    );
  }

  return (
    <Pane>
      <div
        className={clsx([
          "picture-background",
          "p-6 grid content-end relative gallerySliderImage text-white origin-center bg-no-repeat bg-center bg-cover h-gallery-height",
        ])}
      >
        <div className="gallerySlider absolute top-1/2 left-1/2 text-white -translate-x-1/2 -translate-y-1/2 text-center w-full max-w-800px">
          {children}
        </div>
      </div>
    </Pane>
  );
}

export default GallerySliderImage;
