import "server-only";

import { getClient } from "@@/app/lib/apolloClient";
import {
  AllProductStatisticsDocument,
  AllProductStatisticsQuery,
  AllProductStatisticsQueryVariables,
} from "./queries.generated";

export default async function getAllProductStatistics() {
  const { data } = await getClient().query<AllProductStatisticsQuery, AllProductStatisticsQueryVariables>({
    query: AllProductStatisticsDocument,
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return data.allStatistics;
}
