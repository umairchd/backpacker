import "server-only";

import { getClient } from "@@/app/lib/apolloClient";
import {
  SharedChannelByHostDocument,
  SharedChannelByHostQuery,
  SharedChannelByHostQueryVariables,
} from "./queries.generated";

export type Channel = SharedChannelByHostQuery["channel"];
export type SiteConfig = SharedChannelByHostQuery["channel"]["siteConfig"];

export default async function getChannelByHost(host: string) {
  const { data } = await getClient().query<SharedChannelByHostQuery, SharedChannelByHostQueryVariables>({
    query: SharedChannelByHostDocument,
    variables: { host },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return data.channel ?? ({} as typeof data.channel);
}
