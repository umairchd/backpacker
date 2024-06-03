/**
 * this does nothing in this level /country/city/slug/slug
 * move this file 1 level up to get it handle /country/city/slug pages
 */

import { NextPage } from "next";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { OneSlugPageProps } from "./Level1Page-server";

export { getServerSideProps } from "./Level1Page-server";

const ListPage = dynamic(() => import("@@/pages/Listing/ListPage"));
const ProductPage = dynamic(() => import("@@/pages/Product/ProductPage"));

const Level1Page: NextPage<OneSlugPageProps> = (props) => {
  const el = useMemo(() => {
    const { page: pageProps, productsStatistics } = props;

    switch (pageProps?.__typename) {
      case "BPD_ListPage":
        return <ListPage {...{ pageProps, statistics: productsStatistics }} />;
      case "BPD_ProductPage":
        return <ProductPage {...{ pageProps }} />;
      default:
        return null;
    }
  }, [props]);

  return <>{el}</>;
};

export default Level1Page;
