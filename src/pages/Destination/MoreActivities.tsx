import React, { FC, useState, useEffect, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import FilterForm from "../../features/filterForm/components/FilterForm";
import { FIELDS } from "@@/features/filterForm/model/types";
import ProductCard from "../components/ProductCard/ProductCard";
import Pagination from "../components/Pagination/Pagination";
import { getSelectedCurrency } from "@@/features/price/model";
import { updateQueryParams } from "@@/features/filterForm/utils";
import { getFilterDropdownsOptions, getFiltersOptions } from "./utils";
import { useBreakpoints } from "@@/features/utils";

import { useServerContext } from "../lib/ServerContextProvider";
import { useMoreActivitiesQuery } from "@@/pages/Destination/queries/destination-page-queries.generated";
import { ALL_PAGE_LIMIT, MAX_PAGE_HARD_LIMIT, MAX_PRODUCTS_PER_PAGE, MoreActivitiesProps } from "./types";
import { useProductStaticForCategoryAndDestination } from "./hooks/hooks";
import { useProductSearchQuery, HedgeMode } from "@@/pages/Product/queries/product-search-queries.generated";
import { FaRegFaceFrown } from "react-icons/fa6";

const ProductNotFound: FC = () => {
  return (
    <div className="text-center">
      <FaRegFaceFrown className="text-60px mx-auto" />
      <div className="offers-not-found-content">
        <p className="text-base mb-4 mt-10px">
          Oops, it looks like nothing was found
          <br />
          Try our filter to find your desired activities
        </p>
        <span>Or if you need help please</span>
      </div>
      <div className="mt-14px">
        <a
          href="/contact-us"
          className="rounded-full bg-primary px-5 inline-flex items-center justify-center  h-38px text-white text-base font-medium outline-none"
        >
          Contact us
        </a>
      </div>
    </div>
  );
};

const MoreActivities: FC<MoreActivitiesProps> = ({
  country,
  cityUniqueName,
  categoryUniqueName,
  destinationOptionsType,
  hideFilters,
  countries,
  cities,
}) => {
  const formBlockRef = useRef<HTMLElement>();
  const selectedCurrency = useSelector(getSelectedCurrency);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const { asPath: pathname } = useRouter();

  const { host, categories: contextCategories } = useServerContext();

  const { mdUp, lgUp } = useBreakpoints();

  const productsPerPage = useMemo(() => {
    if (lgUp) {
      return MAX_PRODUCTS_PER_PAGE;
    } else if (mdUp) {
      return MAX_PRODUCTS_PER_PAGE - 1;
    } else {
      return MAX_PRODUCTS_PER_PAGE;
    }
  }, [mdUp, lgUp]);

  const {
    productStatisticsDataForCategories,
    productStatisticsDataForDestinations,
    productStatisticsDataForCategoriesFetching,
    productStatisticsDataForDestinationsFetching,
    values,
    setValue,
  } = useProductStaticForCategoryAndDestination(contextCategories, countries, cities, country, destinationOptionsType);

  const handlePaginationClick = (pageNumber: number) => {
    if (formBlockRef?.current && pageNumber !== values[FIELDS.PAGE]) {
      setValue(FIELDS.PAGE, pageNumber);
      formBlockRef.current.scrollIntoView();
    }
  };

  const { destinations, categories } = useMemo(
    () =>
      getFilterDropdownsOptions(
        destinationOptionsType,
        productStatisticsDataForDestinations,
        productStatisticsDataForCategories,
        countries,
        cities,
        contextCategories,
      ),
    [
      productStatisticsDataForDestinations,
      productStatisticsDataForCategories,
      destinationOptionsType,
      countries,
      cities,
      contextCategories,
    ],
  );

  const destinationFilterFormValue = useMemo(() => {
    return values[FIELDS.DESTINATION];
  }, [values]);

  const categoriesFilterFormValue = useMemo(() => {
    return values[FIELDS.CATEGORIES];
  }, [values]);

  const { categoriesFilter, countriesFilter, citiesFilter } = useMemo(
    () =>
      getFiltersOptions(
        categoriesFilterFormValue,
        destinationFilterFormValue,
        categories,
        destinations,
        destinationOptionsType,
        country?.uniqueName,
      ),
    [destinationFilterFormValue, categories, destinations, destinationOptionsType, country?.uniqueName],
  );

  const offsetCount = values[FIELDS.PAGE] === 0 ? 0 : (values[FIELDS.PAGE] - 1) * productsPerPage;

  const limitCount = Math.min(values[FIELDS.PAGE] === 0 ? ALL_PAGE_LIMIT : productsPerPage, MAX_PAGE_HARD_LIMIT);

  const { data: productSearchData, loading: productSearchFetching } = useProductSearchQuery({
    variables: {
      targetCurrency: selectedCurrency || "AUD",
      sortOrder: values[FIELDS.ORDER]?.value,
      filter: {
        countryUniqueNames: countriesFilter,
        cityUniqueNames: citiesFilter,
        categoryUniqueNames: categoriesFilter,
        channelHostFilter: host,
      },
      offset: offsetCount,
      limit: limitCount,
      hedgeMode: HedgeMode.None,
    },
    skip: !!hideFilters,
    ssr: false,
  });

  const { data: pageData, loading: pageDataFetching } = useMoreActivitiesQuery({
    variables: {
      host,
      pathname,
      targetCurrency: selectedCurrency || "AUD",
    },
    skip: !hideFilters,
    ssr: false,
  });

  const productsCount = productSearchData?.products.limitOffsetPageInfo.totalCount || 0;

  const totalPages = hideFilters ? 1 : Math.ceil(productsCount / productsPerPage);

  const products = hideFilters ? pageData?.bpd_page["products"] : productSearchData?.products?.edges.map((e) => e.node);

  const displaySkeletonCards = pageDataFetching || (productSearchFetching && !showAllProducts);

  const displayPagination = totalPages > 1 && !showAllProducts && !hideFilters;

  const productsToDisplay = products && !displaySkeletonCards ? products : [...Array(productsPerPage)].map(() => null);

  const hideFilterForm = useMemo(() => {
    if (hideFilters) {
      return true;
    } else if (
      (!productStatisticsDataForCategories && !productStatisticsDataForCategoriesFetching) ||
      (!productStatisticsDataForDestinations && !productStatisticsDataForDestinationsFetching)
    ) {
      return true;
    }

    return false;
  }, [hideFilters, productStatisticsDataForCategories, productStatisticsDataForDestinations]);

  useEffect(() => {
    if (showAllProducts) {
      setShowAllProducts(false);
      setValue(FIELDS.PAGE, 1);
    }
  }, [values[FIELDS.DESTINATION], values[FIELDS.CATEGORIES], values[FIELDS.ORDER]]);

  useEffect(() => {
    if (values[FIELDS.PAGE] === 0) {
      setShowAllProducts(true);
      updateQueryParams(FIELDS.PAGE, "all");
    } else {
      updateQueryParams(FIELDS.PAGE, values[FIELDS.PAGE] === 1 ? null : values[FIELDS.PAGE]);
    }
  }, [values[FIELDS.PAGE]]);

  return (
    <>
      <div ref={formBlockRef as React.RefObject<HTMLDivElement>}>
        <FilterForm
          cityUniqueName={cityUniqueName}
          categoryUniqueName={categoryUniqueName}
          categories={categories}
          destinations={destinations}
          productCount={productsCount}
          displaySkeletonCards={displaySkeletonCards}
          valuesLoading={{
            [FIELDS.DESTINATION]: productStatisticsDataForDestinationsFetching,
            [FIELDS.CATEGORIES]: productStatisticsDataForCategoriesFetching,
          }}
          hideFilterForm={hideFilterForm}
        />
      </div>
      <div className="sm:px-6 mt-7 container px-3 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {productsToDisplay.length ? (
            productsToDisplay.map((p, ind) => (
              <div key={p?.productId || ind}>
                <ProductCard data={p} />
              </div>
            ))
          ) : (
            <div className="sm:col-span-2 xl:col-span-3">
              <ProductNotFound />
            </div>
          )}
        </div>
      </div>
      {displayPagination && (
        <div className="sm:px-6 container px-3 mx-auto my-10">
          <div className="pagination-wrapper">
            <Pagination
              page={values[FIELDS.PAGE]}
              totalCount={productsCount}
              itemsPerPage={productsPerPage}
              testId="more-activities-pagination"
              onClick={handlePaginationClick}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MoreActivities;
