import dynamic from "next/dynamic";

const ReviewsSection = dynamic(
  () => import("@@/pages/Product/Reviews/ReviewsSection")
);
export default ReviewsSection;
