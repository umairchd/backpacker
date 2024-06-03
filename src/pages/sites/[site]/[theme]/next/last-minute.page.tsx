import { NextPage } from "next";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { LastMinutePageProps } from "@@/pages/last-minute-server";

export { getServerSideProps } from "@@/pages/last-minute-server";

const ListPage = dynamic(() => import("@@/pages/Listing/ListPage"));

const LastMinutePage: NextPage<LastMinutePageProps> = (props) => {
  const { page: pageProps, productsStatistics } = props;

  const el = useMemo(() => {
    if (pageProps.__typename === "BPD_ListPage") {
      return <ListPage {...{ pageProps, statistics: productsStatistics }} />;
    }

    return null;
  }, [pageProps, productsStatistics]);

  return <>{el}</>;
};

export default LastMinutePage;
