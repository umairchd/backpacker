import { useEffectOnce } from "react-use";
import { useServerContext } from "../lib/ServerContextProvider";
import { LatestPostsQuery, useLatestPostsLazyQuery } from "./queries.generated";
import { useChannelUtil } from "../utils/useChannelUtil";

const fallbackData: LatestPostsQuery = {
  blog: {
    url: "/",
    posts: new Array(12).fill(null),
  },
};
export const useBlogPosts = () => {
  const { blogUrl } = useServerContext();

  const [getLastPosts, { data = fallbackData, error }] =
    useLatestPostsLazyQuery({
      fetchPolicy: "cache-and-network",
      variables: {
        baseUrl: blogUrl,
      },
      ssr: false,
    });

  useEffectOnce(() => {
    getLastPosts();
  });

  const blogPosts = data.blog.posts;

  return {
    blogPosts,
    error,
    data,
  };
};

export const useYHAWhiteLabel = () => {
  const { channel } = useServerContext();
  const { key } = channel ?? {};

  const { isYhaChannel } = useChannelUtil(key);

  return isYhaChannel();
};
