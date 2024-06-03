import { getSelectedCurrency } from "@/src/features/price/model";
import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard/ProductCard";
import HomeSection from "./HomeSection";
import { LastMinuteProductGridQuery, useLastMinuteProductGridQuery } from "./queries.generated";
import CustomGlider from "../components/CustomGlider/CustomGlider";
import Pane from "../components/CustomGlider/Pane";

const fallbackData: LastMinuteProductGridQuery = {
  products: new Array(6).fill(null),
};

const LastMinuteProductSlider: React.FC = function LastMinuteProductSlider() {
  const selectedCurrency = useSelector(getSelectedCurrency);

  const { data = fallbackData, error } = useLastMinuteProductGridQuery({
    variables: { targetCurrency: selectedCurrency },
    fetchPolicy: "cache-and-network",
    skip: !selectedCurrency,
    ssr: false,
  });

  if (error) {
    return null;
  }

  const { products } = data;

  if (products.length === 0) {
    return null;
  }

  return (
    <HomeSection
      {...{
        sectionHeader: "Browse Last Minute Travel Deals",
        seeMoreHref: "/last-minute",
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

export default LastMinuteProductSlider;
