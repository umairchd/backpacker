import { FC } from "react";
import { useBlogPosts } from "../../hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";

import Skeleton from "@@/pages/components/Skeleton";

const TravelInspiration: FC = () => {
  const { error, blogPosts } = useBlogPosts();

  if (error) {
    return null;
  }

  if (blogPosts.length === 0) {
    return null;
  }

  const travellInspirationBlogPosts = blogPosts.slice(0, 4);

  return (
    <div className="mt-30px mb-15px md:mt-45px">
      <div className="mb-15px">
        <h1 className="text-xl md:text-28px font-bold leading-1.3 mb-5">Travel Inspiration</h1>
      </div>
      <div className="h-320px md:h-400px lg:h-420px grid gap-15px grid-cols-travelM md:grid-cols-travelTab lg:grid-cols-4 overflow-x-auto hide-scrollbar">
        {travellInspirationBlogPosts.map((post) => (
          <div
            key={post?.id}
            className="h-300px md:h-400px"
          >
            <a
              href={post?.link}
              target="_blank"
              rel="noreferrer"
            >
              <picture>
                {post ? (
                  <LazyLoadImage
                    src={post.featuredImage?.homeBlog}
                    alt={`Travel inspiration in ${post?.title}`}
                    width="100%"
                    height="100%"
                    loading="eager"
                    className="w-full h-full rounded-lg object-cover"
                    effect="opacity"
                    placeholderSrc="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="
                  />
                ) : (
                  <Skeleton className="w-full h-full rounded-lg" />
                )}
              </picture>
              {post && (
                <div className="text-white bg-trend relative bottom-2 left-0 w-full z-2 rounded-bl-md rounded-br-md max-1140-py-10px max-1140-px-15px -mt-20 p-10px flex flex-col justify-end h-20 hover:bg-trend_hover">
                  <span className="text-base leading-1.3 font-semibold mb-5px">{post?.title} &gt;</span>
                </div>
              )}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TravelInspiration;
