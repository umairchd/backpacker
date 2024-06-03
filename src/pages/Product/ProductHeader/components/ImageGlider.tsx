import { FC, useState } from "react";
import WishlistModal from "@@/pages/components/WishlistModal/WishlistModal";
import { ImageGalleryProps } from "../types";
import { useCountdownVisibility } from "@@/pages/Product/ProductContent/hooks/hooks";
import { useMainAndOtherImages } from "../hooks/hooks";
import IconGallery from "./IconGallery";
import ModalImageGallery from "./ModalImageGallery";
import ImageSlider from "@@/pages/components/ImageSlider";
import CountDownTimer from "@@/features/countDown/components/CountDownTimer/CountDownTimer";

const ImageGlider: FC<ImageGalleryProps> = (props) => {
  const [isShown, setIsShown] = useState(false);

  const isShownModal = () => setIsShown(true);
  const handleDismiss = () => setIsShown(false);

  const { imagesGallery: ig } = props;
  const name = ig.name;

  const { mainImage } = useMainAndOtherImages(ig.activeImages);
  const countDownVisible = useCountdownVisibility();
  const countDownLimit = ig.countDownLimit;

  if (ig.isDesktop) {
    return null;
  }

  return (
    <div className="h-285px mb-4 relative md:rounded-lg overflow-hidden md:hidden">
      {ig.iterable_key && (
        <div className="absolute z-10 m-18px right-0 md:hidden">
          <WishlistModal
            id={ig.productId}
            subtitle={ig.name}
            image={mainImage}
            location={ig.location}
            price={ig.price}
            iterableKey={ig.iterable_key}
            currencyCode={ig.currencyCode}
          />
        </div>
      )}

      <ImageSlider
        slides={ig.activeImages}
        isShownModal={isShownModal}
      />

      <IconGallery
        isShownModal={isShownModal}
        countDownLimit={countDownLimit}
        countDownVisible={countDownVisible}
      />

      {!ig.isDesktop && countDownVisible && (
        <div className="absolute left-0 bottom-0 w-full countDonwTimer">
          <CountDownTimer {...{ countDownLimit, format: "simple-pages" }} />
        </div>
      )}

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

export default ImageGlider;
