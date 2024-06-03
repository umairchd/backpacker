import { FC } from "react";

import useSearchBarAnimationEffect from "@@/features/search/components/hooks/useSearchBarAnimationEffect";
import SearchAutocomplete from "@@/features/search/components/SearchAutocomplete/SearchAutocomplete";
import { HomePageQuery } from "@@/pages/queries.generated";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { useYHAWhiteLabel } from "../hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { QuickSearch } from "./QuickSearch";
import { useQuickSearchBreakpoints } from "@@/features/utils";

interface SearchBarProps {
  searchBar: {
    home_header: string;
    home_subheader: string;
    homeImage: HomePageQuery["channel"]["siteConfig"]["homeImage"];
  };
  isBackpackerdealsChannel: boolean;
}

type SearchContainerOptions = {
  qsSecondAndThirdMiddleRow: boolean;
  quickSearchThirdRowOnMobile: boolean;
};

const HomeHeroImage: React.FC<Pick<HomePageQuery["channel"]["siteConfig"], "home_header" | "homeImage">> =
  function HomeImage(props) {
    const { home_header, homeImage: image } = props;
    const { localAsset } = useServerContext();
    const imgSrc = image ? image.top3000 : localAsset("/imagesv3/home-bg.jpg");
    const altText = image ? home_header : image.altText ?? home_header;

    return (
      <LazyLoadImage
        className="object-cover w-full h-full"
        src={imgSrc}
        alt={altText}
        width="100%"
        height="100%"
        effect="opacity"
      />
    );
  };

const getDynamicHeightForSearchContainer = ({
  qsSecondAndThirdMiddleRow,
  quickSearchThirdRowOnMobile,
}: SearchContainerOptions): string => {
  switch (true) {
    case qsSecondAndThirdMiddleRow:
      return "h-400px";
    case quickSearchThirdRowOnMobile:
      return "h-450px";
    default:
      return "h-280px";
  }
};

const SearchBar: FC<SearchBarProps> = (props) => {
  const { home_header, home_subheader, homeImage } = props.searchBar;
  const { intersectionRef, isObscured: isSearchBarObscured } = useSearchBarAnimationEffect();
  const isYhaChannel = useYHAWhiteLabel();

  const heroImage = {
    homeImage,
    home_header,
  };

  const searchInfoItems = [
    {
      title: "🏆 Best Price Guarantee",
    },
    {
      title: "💸 Up to 10% Cashback*",
    },
    {
      title: "✅ Free Cancellation",
    },
    {
      title: "🏖️ Flexible Bookings",
    },
  ];

  const textStyling = isYhaChannel ? "text-center" : "text-left";
  const quickSearchBreakPoints = useQuickSearchBreakpoints();
  const dynamicHeight = getDynamicHeightForSearchContainer(quickSearchBreakPoints);

  return (
    <div className={`relative ${dynamicHeight} md:h-480px bg-searchBg`}>
      <div className="h-full md:h-3/4 relative w-full overflow-hidden ">
        <HomeHeroImage {...heroImage} />
      </div>
      <div className={`absolute inset-0 bg-black/60 opacity-40 rounded-md ${dynamicHeight} lg:h-360px`} />
      <div className="absolute top-0 w-full h-full">
        <div className="max-w-1320px px-3 sm:px-6 mx-auto mt-4 md:mt-14">
          <div className="w-full max-w-1141px mx-auto relative">
            <div className={`${dynamicHeight} md:h-460px grid content-center`}>
              <h1
                className={`md:text-20px lg:text-40px font-bold md:mb-4 lg:mb-6 md:leading-30px lg:leading-50px text-2xl ${textStyling} text-white md:line-clamp-2 line-clamp-4`}
              >
                {home_header}
              </h1>
              <p className={`text-white text-base md:text-18px lg:text-28px ${textStyling} font-bold mb-6`}>
                {home_subheader}
              </p>

              <div className="w-full mt-0 md:mt-6">
                <div className="shadow-box md:px-8 md:py-6 rounded-xl md:bg-white">
                  <div
                    ref={intersectionRef}
                    className="h-16 md:h-20 w-full"
                  >
                    {!isSearchBarObscured && <SearchAutocomplete />}
                  </div>

                  <QuickSearch />

                  <div className="md:justify-center md:gap-6 hidden lg:flex flex-wrap items-center gap-3 pt-4 xl:pt-8">
                    {searchInfoItems.map((item) => (
                      <div
                        className="flex items-center gap-2"
                        key={item.title}
                      >
                        <span className="md:text-base text-sm font-normal">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
