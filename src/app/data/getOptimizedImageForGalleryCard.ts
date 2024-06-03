import { getClient } from "../lib/apolloClient";
import { asset } from "@@/env";
import { GalleryImageDocument, GalleryImageQuery, GalleryImageQueryVariables } from "./queries.generated";

export default async function getOptimizedImageForGalleryCard(src: string) {
  const { data } = await getClient().query<GalleryImageQuery, GalleryImageQueryVariables>({
    query: GalleryImageDocument,
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
