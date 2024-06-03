import { PropsWithChildren, use } from "react";
import getOptimizedImageForBlogCard from "@@/app/data/getOptimizedImageForBlogCard";

function CategoryCard({ src, alt, children }: PropsWithChildren<{ src?: string; alt?: string }>) {
  const transformImage = use(getOptimizedImageForBlogCard(src));

  return (
    <>
      <picture>
        <img
          {...{
            width: 900,
            height: 350,
            src: transformImage?.regionCategoryCard ?? src,
            alt,
            loading: "lazy",
          }}
        />
      </picture>
      <div className="content">{children}</div>
    </>
  );
}

export default CategoryCard;
