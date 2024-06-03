import { FC } from "react";
import { ModalImageGalleryProps } from "../types";
import useFetchPhotoReviews from "../../Reviews/hooks";
import ImageBanner from "./ImageBanner";
import Dialog from "@@/pages/components/Dialog";
import { Tab } from "@headlessui/react";
import classNames from "classnames";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const ModalImageGallery: FC<ModalImageGalleryProps> = (props) => {
  const { isShown, handleDismiss, activeImages, name, productId } = props;
  const { photoReviews } = useFetchPhotoReviews(productId);

  const gallery = photoReviews?.flatMap((review) => review.photos);
  const lazyImage = photoReviews?.flatMap((review) => review.compressed_photos);

  const imageGallery = activeImages.map(({ image }, position) => {
    return (
      <div
        key={image.id}
        id={`#gallery-${position}`}
        className="mb-4 overflow-hidden"
      >
        <ImageBanner
          className="[&>picture>span>img]:rounded-lg"
          {...{ image, name }}
        />
      </div>
    );
  });

  const reviewsIoImages = gallery.map((image, idx) => {
    return (
      <div
        key={`#gallery-${idx}`}
        id={`#gallery-${idx}`}
      >
        <OptimizedHeroImage
          src={image}
          alt={name + " review.io image"}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    );
  });

  const totalPhotos = lazyImage?.length;

  return (
    <Dialog
      show={isShown}
      onClose={handleDismiss}
    >
      <div id="image-gallery-tabs">
        {totalPhotos > 0 ? (
          <div className="-mt-20">
            <Tab.Group defaultIndex={0}>
              <Tab.List className="mb-4 [border-bottom:1px_solid_#dee2e6] flex flex-wrap gap-3 sticky top-0 bg-white">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "text-[1rem] p-2 border-b-4 outline-none",
                      selected ? "border-orange-600 border-solid" : "border-white",
                    )
                  }
                >
                  Gallery ({activeImages?.length})
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "text-[1rem] p-2 border-b-4 outline-none",
                      selected ? "border-orange-600 border-solid" : "border-white",
                    )
                  }
                >
                  Photos From Customers ({totalPhotos})
                </Tab>
              </Tab.List>
              <Tab.Panels className="overflow-auto scrollbar h-[67vh] pr-2">
                <Tab.Panel>{imageGallery}</Tab.Panel>
                <Tab.Panel className="grid gap-5 pt-[0] pr-[0.45rem] pb-4 [&>div>img]:rounded-md [&>div>img]:w-full">
                  {reviewsIoImages}
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        ) : (
          <div className="overflow-auto scrollbar h-[67vh] pr-2 -mt-11">{imageGallery}</div>
        )}
      </div>
    </Dialog>
  );
};

export default ModalImageGallery;
