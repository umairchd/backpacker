import { FC } from "react";
import { topDealDatas } from "../utils";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const TopDeals: FC = () => {
  return (
    <div className="mt-30px mb-15px md:mt-45px">
      <h2 className="text-xl md:text-28px font-bold leading-1.3 mb-5">Top Deals</h2>
      <div className="grid grid-cols-topDeal lg:grid-cols-4 gap-15px mb-15px w-full overflow-x-auto hide-scrollbar">
        {topDealDatas.map((deal) => (
          <a
            key={deal.id}
            href={deal.url}
            target="_blank"
            rel="noreferrer"
            className="no-underline hover:text-primary top-deal"
          >
            <OptimizedHeroImage
              className="w-full h-full object-cover"
              src={deal.image}
              alt={deal.title}
            />
            <h3 className="text-base leading-1.5 font-semibold mb-0 mt-10px max-1399-truncate max-1399-w-full">
              {deal.title}
            </h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
