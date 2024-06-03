import "server-only";
import { getClient } from "../lib/apolloClient";
import {
  SeodataByPathnameDocument,
  SeodataByPathnameQuery,
  SeodataByPathnameQueryVariables,
} from "./queries.generated";

export default async function getSeodataByPathname(host: string, pathname: string) {
  const { data } = await getClient().query<SeodataByPathnameQuery, SeodataByPathnameQueryVariables>({
    query: SeodataByPathnameDocument,
    variables: { host, pathname },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return data.seoData ?? ({} as typeof data.seoData);
}
