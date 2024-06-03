import clsx from "clsx";
import { PropsWithChildren, use } from "react";

import getOptimizedImageForBlogCard from "@@/app/data/getOptimizedImageForBlogCard";

function BlogCard({ src, alt, children }: PropsWithChildren<{ src?: string; alt?: string }>) {
  const transformImage = use(getOptimizedImageForBlogCard(src));

  if (transformImage)
    return (
      <div className="h-320px">
        <div
          className={clsx([
            "relative",
            "rounded-lg h-320px transition-all duration-300 ease-out bg-no-repeat bg-center bg-cover",
          ])}
        >
          <picture className="block absolute inset-0">
            <img
              className="w-full h-full object-cover block"
              src={transformImage?.blog}
              alt={alt}
              loading="lazy"
              width={450}
              height={165}
            />
          </picture>
          <div className="text">{children}</div>
        </div>
      </div>
    );
}

export default BlogCard;
