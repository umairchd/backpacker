import React, { FC, useContext, useRef } from "react";
import dynamic from "next/dynamic";
import { useServerContext } from "../lib/ServerContextProvider";
import { ListPageContext } from "../Listing/ListPage";
import { AdditionalInfoProps, ProductCountProps } from "./types";
import { useAdditionalInfo } from "./hooks/hooks";

const SignUpPopUp = dynamic(() => import("@@/features/signUpPopUp/SignUpPopUp"));

const PopUpAsiaModal = dynamic(() => import("@@/pages/components/PopUpAsiaModal/PopUpAsiaModal"));

const ProductCount: FC<ProductCountProps> = ({ item, url }) => {
  if (item.name.includes("inactive")) {
    return null;
  }

  return (
    <li className="list-none m-0">
      <a
        href={url}
        className="underline flex items-center gap-2 text-sm transition-all border-0 bg-transparent"
      >{`${item.name} (${item.productCount}) `}</a>
    </li>
  );
};

const AdditionalInfo: FC<AdditionalInfoProps> = ({ cities, categories }) => {
  const {
    allStatistics: { countries },
    siteConfig,
    shouldShowPopUp,
  } = useServerContext();
  const { country, city, category } = useContext(ListPageContext);
  const { iterable_key } = siteConfig ?? {};

  const { sortedCities, sortedCategories } = useAdditionalInfo({
    cities,
    categories,
  });

  const sortedCountries = countries
    .map((c) => ({
      ...c.country,
      productCount: c.productCount,
    }))
    .sort((a, b) => a.name?.localeCompare(b.name));

  const additionalInfoSectionRef: React.MutableRefObject<HTMLElement> = useRef(null);

  return (
    <section
      ref={additionalInfoSectionRef}
      className="bg-lightGray py-30px"
    >
      <div className="sm:px-6 container px-3 mx-auto">
        {sortedCities.length > 0 && (
          <div className="my-30px">
            <p className="mb-4 font-bold">You might also like to explore these cities:</p>
            <ul className="flex flex-wrap gap-3">
              {sortedCities.map((item) => {
                const url = category
                  ? `/${item.country.uniqueName}/${item.uniqueName}/${category.uniqueName}`
                  : item.uri.url;

                return (
                  <ProductCount
                    key={item.uniqueName}
                    item={item}
                    url={url}
                  />
                );
              })}
            </ul>
          </div>
        )}
        {sortedCategories.length > 0 && (
          <div className="my-30px">
            <p className="mb-4 font-bold">Some categories you will love:</p>
            <ul className="flex flex-wrap gap-3">
              {sortedCategories.map((item) => {
                const url = country
                  ? `/${country.uniqueName}/${city?.uniqueName ?? "all"}/${item.uniqueName}`
                  : `/${item.uniqueName}`;

                return (
                  <ProductCount
                    key={item.uniqueName}
                    item={item}
                    url={url}
                  />
                );
              })}
            </ul>
          </div>
        )}
        {sortedCountries.length > 0 && (
          <div className="my-30px">
            <p className="mb-4 font-bold">Other countries around the world:</p>
            <ul className="flex flex-wrap gap-3">
              {sortedCountries.map((item) => (
                <ProductCount
                  key={item.uniqueName}
                  item={item}
                  url={item.uri?.url}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
      {shouldShowPopUp && iterable_key && (
        <div className="fixed bottom-0 z-50">
          <SignUpPopUp
            parentRef={additionalInfoSectionRef}
            iterable_key={iterable_key}
          />
        </div>
      )}

      {shouldShowPopUp && <PopUpAsiaModal parentRef={additionalInfoSectionRef} />}
    </section>
  );
};

export default AdditionalInfo;
