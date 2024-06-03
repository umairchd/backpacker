import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Review, ReviewData } from "./types";
import AddReview from "@@/pages/Product/Reviews/AddReview";
import ReviewsCard from "@@/pages/Product/Reviews/ReviewsCard";
import ReviewImageGrid from "@@/pages/Product/Reviews/ReviewImageGrid";
import StarRating from "@@/pages/components/StarRating/StarRating";

const fetchReviews = async (productId: string, page = 10, rating = 0) => {
  try {
    const options = { method: "GET", headers: { accept: "application/json" } };
    const response = await fetch(
      `https://api.reviews.io/reviews?type=product_review&store=backpackerdealscom&sku=${productId}&rating=${rating}&include_subrating_breakdown=true&per_page=${page}`,
      options,
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

const ReviewsSection = ({ productId, averageRating, reviewCount, isBanner }) => {
  const [filterData, setFilterData] = useState<ReviewData | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(10);
  const [currentRating, setCurrentRating] = useState(0);
  const [currentTotal, setCurrentTotal] = useState(reviewCount);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await fetchReviews(productId);
      const barRatings = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
      const returnedRatings = data?.stats.ratings;

      for (const key in returnedRatings) {
        if (returnedRatings[key] > 0) {
          barRatings[key] = returnedRatings[key];
        }
      }

      setRatings(Object.entries(barRatings).reverse());
    };
    fetchInitialData().catch((error: unknown) => {
      console.error(error);
    });
  }, []);

  useEffect(() => {
    const fetchFilterData = async () => {
      const data = await fetchReviews(productId, currentPage, currentRating);
      setFilterData(data);
    };
    fetchFilterData().catch((error: unknown) => {
      console.error(error);
    });
  }, [currentPage, currentRating]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 10);
  };

  const handleRating = (ratingValue: number, ratingSelectedCount: number) => {
    setCurrentRating(ratingValue);
    setCurrentTotal(ratingSelectedCount);
  };

  return (
    <div
      id="ReviewsSection"
      className="bg-clip-border relative flex flex-col min-w-0 mb-0 leading-6 text-black break-words bg-white rounded-lg"
      style={{
        scrollMarginTop: isBanner ? "230px" : "200px",
      }}
    >
      {reviewCount > 0 ? (
        <>
          <ReviewTable
            averageRating={averageRating}
            reviewCount={reviewCount}
            productId={productId}
          >
            {ratings ? (
              ratings.map(([key, value], index) => (
                <ReviewTableRow
                  key={key}
                  value={value}
                  reviewCount={reviewCount}
                  handleRating={() => handleRating(key, value)}
                  index={index}
                />
              ))
            ) : (
              <div>Hold on, reviews are loading...</div>
            )}
          </ReviewTable>
          <Reviews
            filterData={filterData}
            currentRating={currentRating}
            reviewCount={reviewCount}
            handleRating={handleRating}
            currentTotal={currentTotal}
            handleNextPage={handleNextPage}
          />
        </>
      ) : (
        <AddReview productId={productId} />
      )}
    </div>
  );
};

const ReviewTable = ({ averageRating, reviewCount, productId, children }) => (
  <div className="flex flex-wrap items-center mt-4 leading-6 text-black break-words">
    <div className="md:w-1/2 md:flex-none flex-none w-full max-w-full px-3 mt-0 text-black">
      <div className="flex flex-wrap items-center break-words justify-center">
        <div className="flex-none mt-0">
          <span className="text-3xl font-bold leading-10">{+averageRating.toFixed(2)}</span>
        </div>
        <div className="basis-0 flex-grow flex-shrink-0 w-full max-w-full px-3 mt-0 text-black">
          <StarRating
            initialValue={+averageRating.toFixed(2)}
            readonly
            size={35}
          />
        </div>
      </div>
      <div className="flex flex-wrap mt-0 -mx-3 text-xs leading-5">
        <p className="flex-shrink-0 w-full max-w-full px-3 mx-0 mt-0 mb-1">{reviewCount} reviews</p>
        <p className="flex-shrink-0 w-full max-w-full px-3 py-2 mx-0 mt-0 mb-1">
          Total review count and overall rating based on Backpackerdeals and Travello reviews.
        </p>
      </div>
      {children}
    </div>
    <div className="w-full md:w-1/2 md:flex-none flex-none my-2 text-center break-words">
      <ReviewImageGrid productId={productId} />
    </div>
  </div>
);

const ReviewTableRow = ({ handleRating, value, reviewCount, index }) => (
  <div className="flex flex-wrap mt-0 mb-4 -mx-3 break-words">
    <div className="flex-none w-1/2 max-w-full px-3 mt-0 text-xs leading-5">
      <strong> {((value / reviewCount) * 100).toFixed(2)}%</strong>
      <button
        className={clsx("mx-2", value > 0 && "cursor-pointer underline")}
        onClick={handleRating}
        role="link"
        tabIndex={0}
      >
        {value} reviews
      </button>
    </div>
    <div className="flex justify-end flex-none w-1/2 max-w-full px-3 mt-0">
      <span
        className="relative inline-flex text-base text-left text-yellow-400 cursor-pointer pointer-events-none"
        role="img"
        aria-label="5 Stars"
      >
        <StarRating
          initialValue={5 - index}
          readonly
          size={25}
        />
      </span>
    </div>
    <div className="flex-none w-full max-w-full px-3 mt-0">
      <div className="flex h-1 overflow-hidden text-xs leading-4 bg-gray-200 rounded-md">
        <div
          className="whitespace-nowrap flex flex-col justify-center w-full overflow-hidden text-center text-white bg-green-300"
          role="progressbar"
          aria-label="Rating breakdown"
        />
      </div>
    </div>
  </div>
);

const Reviews = ({ filterData, currentRating, handleRating, reviewCount, currentTotal, handleNextPage }) => (
  <>
    <div className="flex flex-wrap mt-0 -mx-3">
      <div className="md:w-1/3 md:flex-none flex-none w-full max-w-full px-3 mt-0">
        {currentRating ? (
          <div className="text-xs leading-5 text-black break-words">
            <p className="mx-0 mt-0 mb-1 text-black">Showing reviews with {currentRating} stars</p>
            <span
              className="leading-5 break-words cursor-pointer"
              onClick={() => handleRating(0, reviewCount)}
            >
              Clear Filter
            </span>
          </div>
        ) : (
          <p className="mx-0 mt-4 mb-1 text-xs leading-5">All Reviews</p>
        )}
      </div>
      <div className="md:w-1/3 md:flex-none flex-shrink-0 w-full max-w-full px-3 mt-0"></div>
      <div className="md:w-1/3 md:flex-none flex-none w-2/3 max-w-full px-3 mt-0"></div>
    </div>

    {filterData?.reviews.map((review: Review) => (
      <ReviewsCard
        key={review.id}
        review={review}
      />
    ))}

    {reviewCount > 10 && currentTotal - filterData?.reviews.length > 0 && (
      <div className="flex flex-wrap my-2 -mx-3 leading-6 text-black break-words">
        <div className="md:w-1/3 md:flex-none flex-none w-2/3 max-w-full px-3 mt-0 text-black">
          <button
            className="text-primary font-bold"
            onClick={handleNextPage}
          >
            Load More
          </button>
        </div>
      </div>
    )}
  </>
);

export default ReviewsSection;
