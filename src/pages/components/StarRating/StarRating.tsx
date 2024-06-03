import { Rating } from "react-simple-star-rating";
import { FC } from "react";

interface RatingProps {
  initialValue: number;
  readonly?: boolean;
  size?: number;
  variant?: "card" | "product";
}

const StarRating: FC<RatingProps> = ({ initialValue, readonly, size = 20, variant = "product" }) => {
  return (
    <Rating
      SVGstyle={{ display: "inline", marginTop: variant === "card" ? 0 : -5 }}
      initialValue={initialValue}
      readonly={readonly}
      size={size}
      allowFraction
    />
  );
};

export default StarRating;
