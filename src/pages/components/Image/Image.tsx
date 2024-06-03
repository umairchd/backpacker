import { useServerContext } from "@@/pages/lib/ServerContextProvider";
import { gql } from "graphql-tag";
import { useOptimizedImageQuery } from "./Image.generated";

gql`
  query OptimizedImage($url: String!, $transform: ImageTransformInput) {
    transformImage: imgTransformImage(url: $url) {
      id
      optimized: imgSrc(transform: $transform)
      fileName
    }
  }
`;

const Image: React.FC<JSX.IntrinsicElements["img"]> = ({ src, width, height, alt, ...otherProps }) => {
  const { asset } = useServerContext();
  const { data } = useOptimizedImageQuery({
    variables: {
      url: asset(src),
      transform: {
        width: width ? Number(width) : null,
        height: height ? Number(height) : null,
      },
    },
  });

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
};

export default Image;
