import { getClient } from "../lib/apolloClient";
import { asset } from "@@/env";
import { ImageSliderImageDocument, ImageSliderImageQuery, ImageSliderImageQueryVariables } from "./queries.generated";

export default async function getOptimizedImageForImageSlider(src: string) {
  const { data } = await getClient().query<ImageSliderImageQuery, ImageSliderImageQueryVariables>({
    query: ImageSliderImageDocument,
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
