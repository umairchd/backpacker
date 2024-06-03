import { PropsWithChildren, use } from "react";
import getOptimizedImageForPlaceCard from "@@/app/data/getOptimizedImageForPlaceCard";

function PlaceImage({ src, alt }: PropsWithChildren<{ src: string; alt: string }>) {
  const transformImage = use(getOptimizedImageForPlaceCard(src));

  return (
    <picture className="block">
      <source srcSet={transformImage?.medium3200} media="(min-width: 1100px)" />
      <source srcSet={transformImage?.medium1100} media="(min-width: 800px)" />
      <img
        className="max-w-full h-auto w-full"
        src={transformImage?.medium800}
        alt={alt}
        loading="lazy"
        width={840}
        height={594}
      />
    </picture>
  );
}

export default PlaceImage;
