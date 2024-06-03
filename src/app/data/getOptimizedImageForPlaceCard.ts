import { getClient } from "../lib/apolloClient";
import { asset } from "@@/env";
import { PlaceImageDocument, PlaceImageQuery, PlaceImageQueryVariables } from "./queries.generated";

export default async function getOptimizedImageForPlaceCard(src: string) {
  const { data } = await getClient().query<PlaceImageQuery, PlaceImageQueryVariables>({
    query: PlaceImageDocument,
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
