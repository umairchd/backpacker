import { FC } from "react";
import { tiktokReviewDatas } from "../utils";
import tiktok from "@@/pages/sites/[site]/[theme]/next/campervan-hire/icons/icn-tiktok.svg";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const TikTok: FC = () => {
  return (
    <div className="mt-30px mb-15px md:mt-45px">
      <div className="flex items-center mb-5">
        <h2 className="text-xl md:text-28px font-bold leading-1.3 mr-5px">What our Customers say on TikTok</h2>
        <img
          src={tiktok.src}
          width={28}
          height={28}
          alt="tiktok"
          className="hidden md:block"
        />
      </div>

      <div className="grid grid-cols-tiktokM md:grid-cols-tiktok gap-15px overflow-x-auto hide-scrollbar h-310px md:h-520px">
        {tiktokReviewDatas.map((review) => (
          <div
            key={review.id}
            className="w-full"
          >
            <a
              key={review.id}
              href="https://vm.tiktok.com/ZGej8T5Qb/"
              target="_blank"
              rel="noreferrer"
              aria-label="TikTok"
            >
              <OptimizedHeroImage
                className="rounded-lg object-cover"
                src={review.image}
                alt={review.alt}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TikTok;
