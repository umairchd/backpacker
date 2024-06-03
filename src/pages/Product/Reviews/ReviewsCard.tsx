import React, { useState } from "react";
import StarRating from "@@/pages/components/StarRating/StarRating";
import ReviewImageGallery from "./ReviewImageGallery";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const ReviewsCard = ({ review }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [imageToOpen, setImageToOpen] = useState("");

  const handleImageClick = (src: string) => {
    setShowGallery(true);
    setImageToOpen(src);
  };

  const reviewPhotos = review.photos
    ?.map((photo: string) => {
      let src = "";
      try {
        const url = new URL(photo);
        src = url.searchParams.get("src");
      } catch (error) {
        console.error("Invalid URL:", photo);
      }
      return {
        src: decodeURIComponent(src),
        imgCompress: photo,
      };
    })
    ?.filter((photo: { imgCompress: null }) => photo.imgCompress !== null);

  const reviewPhotosCount = reviewPhotos?.length;

  return (
    <>
      <div className="py-2 leading-6 text-black break-words">
        <div className="flex items-center text-base font-bold text-black">
          <span className="break-words mr-2 font-bold">{review.author.name}</span>
          <StarRating
            initialValue={review.rating}
            readonly
          />
        </div>
      </div>

      <p className="mx-0 mt-0 mb-1 text-sm font-normal leading-5 break-words">
        {new Date(review.date_created).toLocaleDateString()}
      </p>

      <p className="mx-0 mt-0 mb-1 text-sm font-normal leading-5 break-words italic">{review.comments}</p>

      {showGallery && (
        <ReviewImageGallery
          productId={review.sku}
          src={imageToOpen}
          onClose={() => setShowGallery(false)}
        />
      )}

      <div className="grid gap-1 grid-cols-6 md:grid-cols-12 cursor-pointer mb-2">
        {reviewPhotosCount > 0 &&
          reviewPhotos.map((photo: { src: string; imgCompress: string }) => (
            <OptimizedHeroImage
              className="clickable-image !w-[50px] !h-50px md:!h-[60px] md:!w-[60px] rounded-xl"
              key={`key-${review.id}`}
              src={photo.src}
              alt={review.author.name}
              onClick={() => {
                handleImageClick(photo.src);
              }}
            />
          ))}
      </div>
    </>
  );
};

export default ReviewsCard;
