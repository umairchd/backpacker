import dynamic from "next/dynamic";
import React, { FC } from "react";

const StarRating = dynamic(() => import("../StarRating/StarRating"));

interface DestinationStarRatingProps {
  ratingAvg: number;
  ratingCount: number;
  simplified: boolean;
  inverse?: boolean;
  displayAvg?: boolean;
}

const DestinationStarRating: FC<DestinationStarRatingProps> = ({
  ratingAvg,
  ratingCount,
  simplified,
  inverse,
  displayAvg,
}) => {
  return (
    <div className={`flex items-center justify-center ${inverse && "text-black"}`}>
      {!!displayAvg && ratingAvg && (
        <a href="#reviews" className="flex items-center justify-center">
          <label htmlFor="reviews" className="mr-2.5 text-sm font-bold leading-none">
            {ratingAvg?.toFixed(2)}
          </label>
        </a>
      )}

      {simplified ? (
        <a href="#reviews" className="flex items-center justify-center">
          <StarRating initialValue={ratingAvg} readonly />
          <label htmlFor="reviews" className={`ml-2 text-[11px] font-medium`}>
            {ratingCount ? `(${ratingCount} reviews)` : "Be the first to write a review"}
          </label>
        </a>
      ) : (
        <>
          <StarRating initialValue={ratingAvg} readonly />
          <label htmlFor="reviews" className="ml-2">{`Based on ${ratingCount} reviews`}</label>
        </>
      )}
    </div>
  );
};

export default DestinationStarRating;
