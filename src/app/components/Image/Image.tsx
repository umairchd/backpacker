import { gql } from "graphql-tag";
import {
  AppRouterOptimizedImageDocument,
  AppRouterOptimizedImageQuery,
  AppRouterOptimizedImageQueryVariables,
} from "./Image.generated";
import { asset } from "@@/env";
import { getClient } from "@@/app/lib/apolloClient";
import { use } from "react";

gql`
  query AppRouterOptimizedImage(
    $url: String!
    $transform: ImageTransformInput
  ) {
    transformImage: imgTransformImage(url: $url) {
      id
      optimized: imgSrc(transform: $transform)
      fileName
    }
  }
`;

function Image({
  src,
  width,
  height,
  alt,
  ...otherProps
}: JSX.IntrinsicElements["img"]) {
  const { data } = use(
    getClient().query<
      AppRouterOptimizedImageQuery,
      AppRouterOptimizedImageQueryVariables
    >({
      query: AppRouterOptimizedImageDocument,
      variables: {
        url: asset(src),
        transform: {
          width: width ? Number(width) : null,
          height: height ? Number(height) : null,
        },
      },
    })
  );

  return (
    <img
      {...{
        width,
        height,
        src: data?.transformImage.optimized ?? asset(src),
        alt,
        ...otherProps,
      }}
    />
  );
}

export default Image;
