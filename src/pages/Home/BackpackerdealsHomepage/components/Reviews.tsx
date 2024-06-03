import { FC } from "react";
import { reviewDatas } from "../utils";

import StarRating from "@@/pages/components/StarRating/StarRating";
import { FaHeart } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";

const VerifyIcon = () => (
  <div className="flex items-center ml-5px lg:hidden 1400px:flex text-verified mb-5px leading-none">
    <MdVerified className="shrink-0 text-sm" />
    <span className="text-11px font-semibold">Verified</span>
  </div>
);

const Reviews: FC = () => {
  return (
    <div className="mt-30px mb-15px md:mt-45px hidden lg:block">
      <h2 className="text-xl md:text-28px font-bold leading-1.3 mb-5">
        Trusted By Millions Of Customers
        <FaHeart className="text-redC ml-5px inline-block" />
      </h2>

      <div className="grid grid-cols-4 gap-15px">
        {reviewDatas.map((review) => (
          <div
            key={review.id}
            className="rounded-lg border border-reviewB p-15px"
          >
            <div className="flex items-center mb-5px">
              <h3 className="text-lg font-semibold">{review.name}</h3>{" "}
              <span className="ml-2.5 text-xl leading-none">
                <StarRating
                  initialValue={review.stars}
                  readonly
                />
              </span>
              <VerifyIcon />
            </div>

            <div className="text-13px text-reviewT mb-15px">{review.date}</div>

            <div className="">
              <p className="text-sm leading-6 italic mb-0">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
