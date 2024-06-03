import { nanoid } from "nanoid";
import { Skeleton } from "@mui/material";
import CustomGlider from "../components/CustomGlider/CustomGlider";
import Pane from "../components/CustomGlider/Pane";
import { FC } from "react";
import { useServerContext } from "../lib/ServerContextProvider";
import { useEffectOnce } from "react-use";
import { BlogPostFragment, LatestPostsQuery, Maybe, useLatestPostsLazyQuery } from "../Home/queries.generated";
import GradientCard from "../components/GradientCard/GradientCard";
import { FiChevronsRight } from "react-icons/fi";
import { LazyLoadImage } from "react-lazy-load-image-component";

const fallbackData: LatestPostsQuery = {
  blog: {
    url: "/",
    posts: new Array(12).fill(null),
  },
};

const BlogCard: FC<{ post: Maybe<BlogPostFragment> }> = ({ post }) => {
  return (
    <a
      href={post?.link}
      target="_blank"
      rel="noreferrer"
      className="block"
    >
      <GradientCard className="h-188px rounded-lg bg-primary/10 relative overflow-hidden transition-all duration-200 ease-in bg-no-repeat bg-cover hover:shadow-label group uppercase p-6">
        <picture className="absolute inset-0">
          {post ? (
            <LazyLoadImage
              src={post.featuredImage?.homeBlog}
              className="object-cover w-full h-full"
              alt={post.title}
              width={408}
              height={188}
              effect="opacity"
              placeholderSrc="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
            />
          ) : (
            <Skeleton
              variant="rectangular"
              className="img"
            />
          )}
        </picture>
        <div className="absolute inset-0 flex items-end p-6 transition-all duration-200 ease-linear">
          <div className="z-2 group-hover:mb-3 transition-all duration-400 ease-linear">
            <h3 className="z-1 text-left md:text-base text-sm font-bold transition-all text-white m-0 capitalize leading-6">
              {post?.title}
              {" >"}
            </h3>
          </div>
        </div>
      </GradientCard>
    </a>
  );
};

const BlogSlider: React.FC = function BlogSlider() {
  const { blogUrl } = useServerContext();

  const [getLastPosts, { data = fallbackData, error }] = useLatestPostsLazyQuery({
    fetchPolicy: "cache-and-network",
    variables: {
      baseUrl: blogUrl,
    },
    ssr: false,
  });

  useEffectOnce(() => {
    getLastPosts();
  });

  if (error) {
    return null;
  }

  if (data.blog.posts.length === 0) {
    return null;
  }

  return (
    <section className="md:mt-14 mt-6">
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className="md:mb-3 flex items-center justify-between">
          <h3 className="md:text-3xl text-base font-bold text-black">Travel Inspiration</h3>
          <a
            href={data.blog.url}
            target="_blank"
            rel="noreferrer"
            className="md:text-base text-xs text-textG transition-all md:gap-2 gap-1 flex items-center hover:text-primary"
            id="MoreTravelStories"
          >
            All blogs
            <FiChevronsRight className="text-inherit sm:text-xl text-xs" />
          </a>
        </div>
        <div className="-mx-3">
          <CustomGlider variant="travel-story">
            {data.blog.posts.map((b) => (
              <Pane
                key={nanoid()}
                className="p-3 blogSlide"
              >
                <BlogCard post={b} />
              </Pane>
            ))}
          </CustomGlider>
        </div>
      </div>
    </section>
  );
};

export default BlogSlider;
