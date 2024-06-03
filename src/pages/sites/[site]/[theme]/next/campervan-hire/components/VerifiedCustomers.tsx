import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import { reviewDatas } from "@@/pages/Home/BackpackerdealsHomepage/utils";
import StarRating from "@@/pages/components/StarRating/StarRating";
import clsx from "clsx";

const VerifiedCustomers: FC = () => {
  return (
    <div className="container">
      <div className={classes["section"]}>
        <div className={classes["reviews-section"]}>
          <h2>More from verified customers</h2>

          <div
            className={clsx(
              classes["reviews-content"],
              "grid grid-cols-verifyCust lg:grid-cols-4 gap-[15px] mb-[15px] w-full overflow-x-auto hide-scrollbar",
            )}
          >
            {reviewDatas.map((review) => (
              <div key={review.id} className={classes["review-card"]}>
                <div className={classes["review-header"]}>
                  <div className={classes["review-title"]}>
                    <h3>{review.name}</h3>
                    <div className={classes["verify-icon"]}>
                      <span>Verified</span>
                    </div>

                    <span className={classes["start-rating"]}>
                      <StarRating initialValue={review.stars} readonly />
                    </span>
                  </div>

                  <div className={classes["review-avatar"]}>
                    <img src={review.avatar} alt={review.name} width={140} height={140} loading="eager" />
                  </div>
                </div>

                <div className={classes["review-body"]}>
                  <p>{review.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiedCustomers;
