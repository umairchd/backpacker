import { PropsWithChildren, use } from "react";
import classes from "./GalleryImage.module.scss";
import clsx from "clsx";
import getOptimizedImageForGalleryCard from "@@/app/data/getOptimizedImageForGalleryCard";

/**
 * Multiple resolution Image Pane with title/content
 * Glider needs a Pane with a key for each image, so wrap image with a Pane
 */
function GalleryImage({
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
      <div className={clsx(["destination-head"])}>
        <picture className="block">
          <source srcSet={transformImage.top3000} media="(min-width: 2300px)" />
          <source srcSet={transformImage.top2400} media="(min-width: 1500px)" />
          <source srcSet={transformImage.top1600} media="(min-width: 1100px)" />
          <img
            className="max-w-full h-auto w-full"
            src={
              transformImage.top3000 ??
              "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            }
            alt={alt}
          />
        </picture>

        <div className={clsx([classes.caption])}>{children}</div>
      </div>
    );
  }

  return (
    <div
      className={clsx([
        "gridItem",
        "picture-background",
        classes.card,
        "cardImgFeature",
      ])}
    />
  );
}

export default GalleryImage;
