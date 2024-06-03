"use client";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { type ImageProps } from "next/image";
import Skeleton from "@@/pages/components/Skeleton";
import { HeroImageFragment } from "../queries/queries.generated";
import clsx from "clsx";

const HeroImage: FC<
  Omit<HeroImageFragment, "id" | "fileName"> &
    JSX.IntrinsicElements["img"] &
    Pick<ImageProps, "priority" | "width" | "height" | "loading" | "className" | "onClick" | "style">
> = (image) => {
  return (
    <picture>
      <source
        srcSet={`
          ${image.top1600} 1600w,
          ${image.top1400} 1400w,
          ${image.top1024} 1024w,
          ${image.top800} 800w,
          ${image.top768} 768w,
          ${image.top480} 480w
        `}
        sizes={`
          (min-width: 1600px) 1600px,
          (min-width: 1400px) 1400px,
          (min-width: 1024px) 1024px,
          (min-width: 800px) 800px,
          (min-width: 768px) 768px,
          (min-width: 480px) 480px
        `}
      />

      {image.top480 ? (
        <LazyLoadImage
          className={clsx(
            "object-cover object-center cursor-pointer h-full w-full max-h-full max-w-full bg-gray-300",
            image.className,
          )}
          src={image.top1024}
          alt={image.altText ?? image.alt}
          width={image?.width ?? "100%"}
          height={image?.height ?? "auto"}
          sizes={`
              (min-width: 1600px) 1600px,
              (min-width: 1400px) 1400px,
              (min-width: 1024px) 1024px,
              (min-width: 800px) 800px,
              (min-width: 768px) 768px,
              (min-width: 480px) 480px
            `}
          {...(image.loading ? { loading: image.loading } : {})}
          effect="opacity"
          placeholderSrc={image.top480}
          onClick={image.onClick}
          style={image.style}
        />
      ) : (
        <Skeleton
          width="100%"
          height="100%"
        />
      )}
    </picture>
  );
};

export default HeroImage;
