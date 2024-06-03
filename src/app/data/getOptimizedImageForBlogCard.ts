import { getClient } from "../lib/apolloClient";
import { BlogImageDocument, BlogImageQuery, BlogImageQueryVariables } from "./queries.generated";
import { asset } from "@@/env";

export default async function getOptimizedImageForBlogCard(src: string) {
  const { data } = await getClient().query<BlogImageQuery, BlogImageQueryVariables>({
    query: BlogImageDocument,
    variables: {
      url: asset(src),
    },
    context: {
      fetchOptions: {
        next: {
          revalidate: 300,
        },
      },
    },
  });

  return data.transformImage ?? ({} as typeof data.transformImage);
}
