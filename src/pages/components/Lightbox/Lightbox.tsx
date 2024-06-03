import React, { FC, useMemo } from "react";
import ImageLightbox from "react-image-lightbox";

import { HeroImageFragment } from "@@/pages/components/queries/queries.generated";

interface LightboxProps {
  images: HeroImageFragment[];
  currentPictureInd: number | null;
  onPictureChange: (ind: number) => void;
  onClose: () => void;
}

const Lightbox: FC<LightboxProps> = ({ images, currentPictureInd, onPictureChange, onClose }) => {
  const [prevInd, nextInd] = useMemo(() => {
    return [(currentPictureInd + images.length - 1) % images.length, (currentPictureInd + 1) % images.length];
  }, [images, currentPictureInd]);

  if (currentPictureInd === null) {
    return null;
  }

  return (
    <>
      <span className="absolute text-white z-100 top-30px left-35px text-xl">{`${currentPictureInd + 1}/${
        images.length
      }`}</span>
      <ImageLightbox
        mainSrc={images[currentPictureInd].top1400}
        nextSrc={images[nextInd].top1400}
        prevSrc={images[prevInd].top1400}
        enableZoom={false}
        onCloseRequest={onClose}
        onMoveNextRequest={() => onPictureChange(nextInd)}
        onMovePrevRequest={() => onPictureChange(prevInd)}
      />
    </>
  );
};

export default Lightbox;
