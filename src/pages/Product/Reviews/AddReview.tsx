import React from "react";

import placeHolderImage from "../../../themes/images/icon-photo-gallery.png";
import ReviewForm from "@@/pages/Product/Reviews/ReviewForm";
import Image from "next/image";

const AddReview = ({ productId }) => {
  return (
    <div className="flex flex-col justify-end items-center h-full leading-6 text-center text-black break-words">
      <p className="mx-0 mt-0 mb-1 text-base leading-5 text-black">
        We’d love to hear about your experience! Share your feedback with us,
        and get rewarded!
      </p>
      <Image
        loader={({ src }) => src}
        src={placeHolderImage.src}
        alt="place holder"
        width={100}
        height={100}
        loading="eager"
      />
      <span className="block w-3/5 text-center break-words">
        <div className="text-black">
          <ReviewForm productId={productId} />
        </div>
      </span>
    </div>
  );
};

export default AddReview;
