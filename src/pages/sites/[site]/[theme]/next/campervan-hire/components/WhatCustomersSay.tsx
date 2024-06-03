import { FC } from "react";
import classes from "../CampervanHire.module.scss";
import { tiktokReviewDatas } from "@@/pages/Home/BackpackerdealsHomepage/utils";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const WhyCustomersSay: FC = () => {
  return (
    <div
      style={{
        background: "linear-gradient(180deg, #F7F7F7 0%, rgba(255, 255, 255, 0.00) 112.72%)",
      }}
    >
      <div className="container">
        <div className={classes["section"]}>
          <div className={classes["customers-say-section"]}>
            <h2>What our Customers say on TikTok</h2>

            <div className="grid grid-cols-tiktokM md:grid-cols-tiktok gap-15px overflow-x-auto hide-scrollbar">
              {tiktokReviewDatas.map((review) => (
                <div
                  key={review.id}
                  className={classes["tiktok-review-card"]}
                >
                  <a
                    key={review.id}
                    href="https://vm.tiktok.com/ZGej8T5Qb/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <OptimizedHeroImage
                      src={review.image}
                      alt={review.alt}
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyCustomersSay;
