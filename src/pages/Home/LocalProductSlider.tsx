import { getSelectedCurrency } from "@/src/features/price/model";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import HomeSection from "./HomeSection";
import { useLocalProductGridQuery, LocalProductGridQuery } from "./queries.generated";
import CustomGlider from "../components/CustomGlider/CustomGlider";
import Pane from "../components/CustomGlider/Pane";
import { PropsWithChildren } from "react";

const fallbackData: LocalProductGridQuery = {
  homeLocalDeals: {
    title: "Activities and Things to do",
    seeAllRelativeUrl: "/search",
    products: new Array(6).fill(null),
  },
};

const LocalProductSlider: React.FC<
  PropsWithChildren<{
    isMillionDollarPage?: boolean;
  }>
> = function LocalProductSlider({ isMillionDollarPage }) {
  const selectedCurrency = useSelector(getSelectedCurrency);

  const { data = fallbackData, error } = useLocalProductGridQuery({
    variables: { targetCurrency: selectedCurrency },
    fetchPolicy: "cache-and-network",
    skip: !selectedCurrency,
    ssr: false,
  });

  if (error) {
    return null;
  }

  const { seeAllRelativeUrl, products, title } = data.homeLocalDeals;

  if (products.length === 0) {
    return null;
  }

  return (
    <HomeSection
      {...{
        sectionHeader: title,
        seeMoreHref: seeAllRelativeUrl,
        isMillionDollarPage,
      }}
      className="py-4"
    >
      <div className="-mx-3">
        <CustomGlider hasDots>
          {products.map((product) => {
            return (
              <Pane
                className="px-3 pt-1"
                key={product?.productId ?? nanoid()}
              >
                <ProductCard {...{ data: product }} />
              </Pane>
            );
          })}
        </CustomGlider>
      </div>
    </HomeSection>
  );
};

export default LocalProductSlider;
