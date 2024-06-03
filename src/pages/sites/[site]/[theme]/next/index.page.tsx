import { FC, useMemo } from "react";
import dynamic from "next/dynamic";

import type { NextPage } from "next";
import { nanoid } from "nanoid";

export { getServerSideProps } from "@@/pages/index.page-server";
import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { CategoryCardV2 } from "@@/pages/components/CategoryCard/CategoryCard";
import { useBreakpoints } from "@@/features/utils";
import { useChannelUtil } from "@@/pages/utils/useChannelUtil";
import { HomePageQuery } from "@@/pages/queries.generated";
import { IHomeBanner } from "@@/pages/Home/BackpackerdealsHomepage/types";

import Pane from "@@/pages/components/CustomGlider/Pane";
import HomeSection from "@@/pages/Home/HomeSection";
import CustomGlider from "@@/pages/components/CustomGlider/CustomGlider";
import CityCardV2 from "@@/pages/components/CityCard/CityCard";
import FlightCentreUspSection from "@@/pages/Home/FlightCentreUspSection";
import WhyBookWithUs from "@@/pages/Home/WhyBookWithUs";
import HomepageContent from "@@/pages/Home/HomepageContent";
import SearchBar from "@@/pages/Home/Searchbar/Searchbar";
import BackpackerdealsHomepage from "@@/pages/Home/BackpackerdealsHomepage";
import SeoContent from "@@/pages/Home/SeoContent/SeoContent";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PlantaTreeBanner = dynamic(() => import("@@/pages/Home/PlantaTreeBanner"));

const LastMinuteProductSlider = dynamic(() => import("@@/pages/Home/LastMinuteProductSlider"));

const LocalProductSlider = dynamic(() => import("@@/pages/Home/LocalProductSlider"));
const BlogSlider = dynamic(() => import("@@/pages/Home/BlogSlider"));

const BannerSection: FC<IHomeBanner> = ({ link, heading, images }) => {
  const { xlUp: isDesktop } = useBreakpoints();
  return (
    <HomeSection
      {...{ sectionHeader: heading, isDesktop: isDesktop }}
      className="pb-0"
    >
      <div className="-mx-3">
        <CustomGlider
          variant="banner"
          autoPlay
          autoPlaySpeed={5000}
        >
          {images.map((image) => {
            return (
              <Pane
                className="px-3"
                key={image.id}
              >
                <a
                  href={link}
                  className="rounded-lg overflow-hidden block h-full"
                >
                  <picture
                    id="HomepageBannerClick"
                    className="block"
                  >
                    <source
                      srcSet={image.bannerTop1400}
                      media="(min-width: 1400px)"
                    />
                    <source
                      srcSet={image.bannerTop1024}
                      media="(min-width: 1024px)"
                    />
                    <source
                      srcSet={image.bannerTop768}
                      media="(min-width: 768px)"
                    />
                    <LazyLoadImage
                      className="w-full object-cover h-full rounded-lg"
                      src={image.bannerTop1400}
                      alt={image.altText}
                      width="100%"
                      height="auto"
                      effect="opacity"
                      placeholderSrc={image.bannerTop480}
                    />
                  </picture>
                </a>
              </Pane>
            );
          })}
        </CustomGlider>
      </div>
    </HomeSection>
  );
};

const useCardGrids = () => {
  const { allStatistics } = useServerContext();

  return useMemo(() => {
    const homeCities = (allStatistics.cities ?? []).filter((c) => c.city.metaData?.priority > 0).slice(0, 8);

    homeCities.sort(
      (
        {
          city: {
            metaData: { priority: pA },
          },
        },
        {
          city: {
            metaData: { priority: pB },
          },
        },
      ) => pA - pB,
    );

    const homeCategories = (allStatistics.categories ?? [])
      .filter((c) => c.category.metaData?.priority > 0)
      .slice(0, 8);

    homeCategories.sort(
      (
        {
          category: {
            metaData: { priority: pA },
          },
        },
        {
          category: {
            metaData: { priority: pB },
          },
        },
      ) => pA - pB,
    );

    return {
      homeCities,
      homeCategories,
    };
  }, [allStatistics]);
};

const HomePage: NextPage<HomePageQuery> = (data) => {
  const { name } = useServerContext();
  const { channel } = data;
  const { key } = channel;
  const { siteConfig } = channel;
  let sectionHeader: string;

  const {
    home_header = "Great Experiences — Backpacker Prices",
    home_subheader = "Deals and discounts on activities, tours and things to do!",
    homeImage,
    home_schema,
    is_homepage_content_active,
    homepage_content,
  } = siteConfig;

  const { homeCities, homeCategories } = useCardGrids();

  const {
    isFlightCentreChannel,
    isSpaceShipsChannel,
    isWikiCampsChannel,
    isBackpackerDealsChannel,
    isTravelloChannel,
    isSydneyexpertChannel,
    isYhaChannel,
  } = useChannelUtil(key);

  if (isFlightCentreChannel()) {
    sectionHeader = "You’re the centre of our centre";
  } else if (isSpaceShipsChannel()) {
    sectionHeader = "Why Book Your Next Activity with " + name + "?";
  } else if (isWikiCampsChannel()) {
    sectionHeader = "Why Book With Us?";
  } else if (isYhaChannel()) {
    sectionHeader = "Why Book Your Next Trip with Us?";
  } else {
    sectionHeader = "Why Book Your Next Trip with " + name + "?";
  }

  const whyBookWithUsProps = {
    sectionHeader,
    className: "section-why-us bg-white pb-4",
  };

  const topTravelDealsProps = {
    sectionHeader: "Top Travel Deals by Destination",
    className: `${"section-home-promoted-category-box"} grid-layout py-4`,
    seeMoreHref: "/search",
  };

  const browsePopularProps = {
    sectionHeader: "Browse Popular Adventure Travel Activities",
    className: `${"section-category-activities"} grid-layout py-4`,
    seeMoreHref: "/search",
  };

  const isHomepageCustom = isBackpackerDealsChannel() || isTravelloChannel() || isSydneyexpertChannel();

  return (
    <>
      <SearchBar
        searchBar={{ home_header, home_subheader, homeImage }}
        isBackpackerdealsChannel={isHomepageCustom}
      />

      {isHomepageCustom ? (
        <BackpackerdealsHomepage
          isBackpackerdealsChannel={isBackpackerDealsChannel()}
          banners={channel.banners}
        />
      ) : (
        <>
          {is_homepage_content_active && homepage_content ? (
            <HomepageContent homepage_content={homepage_content} />
          ) : (
            <>
              {channel.banners.map((b) => {
                return (
                  <BannerSection
                    key={nanoid()}
                    {...b}
                  />
                );
              })}
              <HomeSection {...whyBookWithUsProps}>
                <FlightCentreUspSection isFlightCentre={isFlightCentreChannel()} />

                <WhyBookWithUs
                  channel={channel}
                  isFlightCentre={isFlightCentreChannel()}
                />
              </HomeSection>
              <HomeSection
                {...topTravelDealsProps}
                className="bg-lightGray"
              >
                <ul className="grid grid-cols-topTravel sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 overflow-auto hide-scrollbar py-2 mb-4">
                  {homeCities.map((c, indx) => {
                    return (
                      <li
                        key={`city-${c.id}`}
                        className={`list-none m-0 ${indx == 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                      >
                        <CityCardV2 {...c} />
                      </li>
                    );
                  })}
                </ul>
              </HomeSection>
              <PlantaTreeBanner classNames="section-planta-tree-banner" />
              <HomeSection {...browsePopularProps}>
                <ul className="grid grid-cols-topTravel sm:grid-cols-2 md:grid-cols-4 gap-6 overflow-auto hide-scrollbar py-2 mb-4">
                  {homeCategories.map((c, indx) => {
                    return (
                      <li
                        key={`category-${c.id}`}
                        className={`list-none m-0 ${indx == 0 ? "md:col-span-2" : ""}`}
                      >
                        <CategoryCardV2 {...c} />
                      </li>
                    );
                  })}
                </ul>
              </HomeSection>
              <LastMinuteProductSlider />
              {!isYhaChannel() && <LocalProductSlider />}
              <div className="max-w-1320px px-3 sm:px-6 mx-auto">
                <SeoContent />
              </div>
            </>
          )}
          <BlogSlider />
          <div
            dangerouslySetInnerHTML={{ __html: home_schema }}
            suppressHydrationWarning
          />
        </>
      )}
    </>
  );
};

export default HomePage;
