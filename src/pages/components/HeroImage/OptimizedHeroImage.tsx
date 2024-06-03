import { useGalleryImageLazyQuery } from "@@/app/data/queries.generated";
import HeroImage from "../HeroImage/HeroImage";
import { type ImageProps } from "next/image";
import { useEffect } from "react";

const OptimizedHeroImage: React.FC<
  JSX.IntrinsicElements["img"] & Pick<ImageProps, "priority" | "width" | "height" | "className" | "onClick" | "style">
> = ({ src, alt, loading, priority, width, height, className, onClick, style }) => {
  const [loadGalleryImage, { data }] = useGalleryImageLazyQuery({
    variables: {
      url: src,
    },
  });

  useEffect(() => {
    loadGalleryImage();
  }, [loadGalleryImage]);

  return (
    <HeroImage
      {...{
        ...(data?.transformImage ?? { id: "placeholder" }),
        altText: alt,
        loading,
        className,
        priority,
        width,
        height,
        onClick,
        style,
      }}
    />
  );
};

export default OptimizedHeroImage;
