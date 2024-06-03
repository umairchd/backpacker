import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import ReviewImageGallery from "./ReviewImageGallery";
import AddReview from "@@/pages/Product/Reviews/AddReview";
import useFetchPhotoReviews from "./hooks";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const ReviewImageGrid = ({ productId }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [imageToOpen, setImageToOpen] = useState("");
  const { photoReviews } = useFetchPhotoReviews(productId);

  const handleImageClick = (src: string) => {
    setShowGallery(true);
    setImageToOpen(src);
  };

  //5 photos total from 5 reviews
  const photosToRender = () =>
    photoReviews
      ?.slice(0, 3)
      .flatMap((photoReview) => photoReview.photos)
      .slice(0, 3);

  const renderImages = () => {
    const photos = photosToRender();

    const photoSize = photos.length;
    if (!photoSize) {
      return [];
    }

    const renderedImages = [];
    let twoPhotos = photos?.splice(0, 2) ?? [];

    while (twoPhotos.length != 0) {
      renderedImages.push(renderTwoImagesPerRow(twoPhotos));
      twoPhotos = photos.splice(0, 2);
    }

    //even then we need to add a new row for the load more
    if (photoSize % 2 == 0) {
      renderedImages.push(renderTwoImagesPerRow([]));
    }

    return renderedImages;
  };

  const renderTwoImagesPerRow = (photos: any[]) => (
    <div className="grid gap-2 grid-cols-2 text-black cursor-pointer mb-2">
      {photos.map(
        (photo: string) =>
          photo && (
            <div
              key={photo}
              className="relative w-full h-185px"
            >
              <OptimizedHeroImage
                className="rounded-xl w-full h-185px object-cover"
                src={photo}
                alt={"Review image"}
                onClick={() => {
                  handleImageClick(photo);
                }}
                height={185}
              />
            </div>
          ),
      )}
      {photos.length < 2 && renderLoadMoreImages()}
    </div>
  );

  const renderLoadMoreImages = () => {
    const photos = photosToRender();
    const otherPhotos = photoReviews?.flatMap((photoReview) => photoReview.photos).slice(-1)[0];

    if (photos.length > 0) {
      return (
        <>
          <div className="flex items-center justify-center w-full h-185px relative">
            <div className="relative w-full h-185px">
              <OptimizedHeroImage
                className="rounded-xl object-cover h-185px"
                src={otherPhotos}
                alt={"Review image"}
                onClick={() => {
                  handleImageClick(otherPhotos);
                }}
                key={photos[0]}
                height={185}
              />
            </div>
            <div
              className="absolute text-black bg-zinc-500 bg-opacity-[0.75] rounded-xl w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => handleImageClick(photoReviews[0]?.photos[0])}
            >
              <div className="overflow-hidden text-white flex flex-col items-center justify-center">
                <div className="text-base break-words truncate">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="image"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    height="27"
                  >
                    <path
                      fill="currentColor"
                      d="M448 80c8.8 0 16 7.2 16 16V415.8l-5-6.5-136-176c-4.5-5.9-11.6-9.3-19-9.3s-14.4 3.4-19 9.3L202 340.7l-30.5-42.7C167 291.7 159.8 288 152 288s-15 3.7-19.5 10.1l-80 112L48 416.3l0-.3V96c0-8.8 7.2-16 16-16H448zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 192a48 48 0 1 0 0-96 48 48 0 1 0 0 96z"
                      className="cursor-pointer"
                    />
                  </svg>
                </div>
                <div className="mx-0 mt-3 whitespace-nowrap break-words">More photos</div>
              </div>
            </div>
          </div>
        </>
      );
    }
    return null;
  };

  return (
    <>
      {photoReviews.length < 1 ? (
        <AddReview productId={productId} />
      ) : (
        <>
          {showGallery && (
            <ReviewImageGallery
              productId={productId}
              src={imageToOpen}
              onClose={() => setShowGallery(false)}
            />
          )}
          <div className="flex-none ml-0 md:ml-6 my-2 w-full max-w-full leading-6 text-center text-black break-words">
            {renderImages()}
          </div>
          <div className="text-center break-words">
            <ReviewForm productId={productId} />
          </div>
        </>
      )}
    </>
  );
};

export default ReviewImageGrid;
