import { FC, useState } from "react";
import { ImageGalleryProps } from "../types";
import WishlistModal from "@@/pages/components/WishlistModal/WishlistModal";
import { useMainAndOtherImages } from "../hooks/hooks";
import IconGallery from "./IconGallery";
import ImageBanner from "./ImageBanner";
import ModalImageGallery from "./ModalImageGallery";
import classNames from "classnames";

const ImageGallery: FC<ImageGalleryProps> = (props) => {
  const { imagesGallery: ig } = props;

  const name = ig.name;
  const activeImages = ig.activeImages.slice(0, 3);

  const { mainImage, otherImages } = useMainAndOtherImages(activeImages);

  const [isShown, setIsShown] = useState(false);
  const isShownModal = () => setIsShown(true);
  const handleDismiss = () => setIsShown(false);

  const countImageThree = activeImages?.length >= 3;
  const countImageTwo = activeImages?.length >= 2;
  const imageTwo = activeImages?.length === 2;

  if (!ig.isDesktop) {
    return null;
  }

  return (
    <div className="h-405px">
      {countImageThree || countImageTwo ? (
        <div className="grid gap-3 grid-cols-imageGallery h-405px">
          <div className="col-1_/_2 rounded-lg overflow-hidden bg-gray-300">
            <ImageBanner
              className="max-h-405px"
              {...{ image: mainImage.image, name }}
              onClick={isShownModal}
              width={843}
              height={405}
            />
          </div>

          <div className={classNames(!countImageThree ? "grid-rows-1fr gap-0" : "grid grid-rows-2fr gap-3")}>
            {otherImages?.map(({ image }) => {
              return (
                <div
                  key={image.id}
                  className={`w-full h-full ${
                    imageTwo ? "max-h-full" : "max-h-195px"
                  } rounded-lg overflow-hidden bg-gray-300`}
                >
                  <ImageBanner
                    className="max-h-405px"
                    {...{ image, name }}
                    onClick={isShownModal}
                    width={415}
                    height={195}
                    loading="lazy"
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        activeImages.map(({ image }) => {
          return (
            <div
              key={image.id}
              className="h-405px rounded-lg overflow-hidden bg-gray-300"
            >
              <ImageBanner
                className="max-h-405px"
                onClick={isShownModal}
                {...{ image, name }}
              />
            </div>
          );
        })
      )}

      <div className="relative flex justify-between items-center -top-55px">
        <IconGallery isShownModal={isShownModal} />

        {ig.iterable_key && (
          <div className="absolute z-11 md:-bottom-41px xs:transform xs:-translate-y-50px xs:left-5 sm:right-4 text-primary text-sm md:text-xs font-medium flex items-center cursor-pointer w-fit">
            <WishlistModal
              id={ig.productId}
              subtitle={name}
              image={mainImage}
              location={ig.location}
              price={ig.price}
              iterableKey={ig.iterable_key}
              currencyCode={ig.currencyCode}
            />
          </div>
        )}
      </div>

      {isShown && (
        <ModalImageGallery
          isShown={isShown}
          handleDismiss={handleDismiss}
          activeImages={ig.activeImages}
          name={name}
          productId={ig.productId}
        />
      )}
    </div>
  );
};

export default ImageGallery;
