import { createContext, FC, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { FormProvider } from "react-hook-form";

import { ListPageFragment } from "@@/pages/Listing/queries/listing-queries.generated";
import { useFilterForm } from "@@/features/filterForm/hooks";
import { useServerContext } from "../lib/ServerContextProvider";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import DestinationHeader from "../Destination/DestinationHeader";
import DestinationFooter from "../Destination/DestinationFooter";
import AdditionalInfo from "../Destination/AdditionalInfo";
import { ListPageProductStatisticsQuery } from "@@/pages/Level1Page/queries/level1Page-queries.generated";
import useTracking from "../lib/useTracking";
import Head from "next/head";
import MoreActivities from "../Destination/MoreActivities";
import { ImageCardFragment } from "@@/pages/components/queries/queries.generated";

export const ListPageContext = createContext<Pick<ListPageFragment, "category" | "city" | "country">>(null);

const ListPage: FC<{
  pageProps: ListPageFragment;
  statistics: ListPageProductStatisticsQuery["productsStatistics"];
}> = ({ pageProps, statistics }) => {
  const { track } = useTracking();
  const formData = useFilterForm();
  const { channel } = useServerContext();
  const { features } = channel ?? {};
  const {
    query: { countryOrSlug, categoryOrSlug },
  } = useRouter();
  const { country, city, category, listFilter } = pageProps;
  const breadcrumbs = [];
  const isTopDeals = !!listFilter?.top_deal;

  let name: string | null;
  let image: ImageCardFragment | null;
  let destinationOptionsType: "country" | "city" = "city";

  if (isTopDeals || countryOrSlug === "search" || (!country && category) || !pageProps.relatedCities) {
    destinationOptionsType = "country";
  }

  if (isTopDeals) {
    breadcrumbs.push({ label: "Top Deals", href: "/top-deals" });
  } else {
    name = country?.name || category?.name || "";
    image = country?.image || category?.image;

    if (country) {
      breadcrumbs.push({ label: country.name, href: country.uri?.url });
    } else if (category) {
      breadcrumbs.push({ label: category.name, href: category.uri?.url });
    }

    if (city) {
      name = city.name;
      breadcrumbs.push({ label: city.name, href: city.uri?.url });
      if (city.image) {
        image = city.image;
      }
    }

    if (categoryOrSlug && category) {
      breadcrumbs.push({ label: category.name, href: category.uri?.url });

      if (category.image) {
        image = category.image;
      }
    }
  }

  const headerData = {
    ...pageProps.landingPage,
    image: pageProps.landingPage?.image || image,
    name,
    totalReviews: pageProps.totalReviews,
    ratingScore: pageProps.ratingScore,
  };

  const contextValue = useMemo(() => {
    return { category, city, country };
  }, [country, city, category]);

  const staticsPayload = statistics?.countries?.map((country) => ({
    id: country.id,
    name: country.country.name,
    url: country.country.uri?.url,
    productCount: country.productCount,
  }));

  useEffect(() => {
    const trackingPagePayload = {
      event: "listPageView",
      ecommerce: {
        products: [staticsPayload],
      },
    };

    track(trackingPagePayload);
  }, []);

  const imageOg = useMemo(() => {
    return headerData?.image?.fileName;
  }, [headerData?.image]);

  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href={imageOg}
        />
        <meta
          property="og:image"
          content={imageOg}
        />
        <meta
          property="twitter:image"
          content={imageOg}
        />
      </Head>

      <ListPageContext.Provider value={contextValue}>
        <FormProvider {...formData}>
          <div className="sm:px-6 container px-3 mx-auto mt-4 mb-8">
            <Breadcrumbs items={breadcrumbs} />
            <DestinationHeader {...headerData} />
          </div>
          <MoreActivities
            country={country}
            cityUniqueName={city?.uniqueName}
            categoryUniqueName={category?.uniqueName}
            hideFilters={!listFilter}
            countries={pageProps.relatedCountries}
            cities={pageProps.relatedCities}
            destinationOptionsType={destinationOptionsType}
          />
          <div className="sm:px-6 container px-3 mx-auto my-10">
            {features?.includes("listing-page-content") && pageProps.landingPageFooter?.teaser && (
              <DestinationFooter {...pageProps.landingPageFooter} />
            )}
          </div>
          <AdditionalInfo {...statistics} />
        </FormProvider>
      </ListPageContext.Provider>
    </>
  );
};

export default ListPage;
