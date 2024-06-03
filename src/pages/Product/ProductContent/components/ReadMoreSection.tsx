import { FC } from "react";
import { ReadMoreSectionProps } from "../types";
import { useReadMore } from "@@/pages/Product/ProductContent/hooks/hooks";

const ReadMoreSection: FC<ReadMoreSectionProps> = ({ content, count }) => {
  const { content: readMoreContent, showReadMore, readMore, toggleReadMore } = useReadMore(content, count);

  return (
    <div>
      <div
        className="mt-1 custom_editor first-letter:"
        dangerouslySetInnerHTML={{ __html: readMoreContent }}
        suppressHydrationWarning
      />
      {showReadMore && (
        <span
          onClick={toggleReadMore}
          className="text-primary hover:underline inline-block mt-4 text-base font-semibold cursor-pointer"
        >
          {readMore ? "Read Less" : "Read More"}
        </span>
      )}
    </div>
  );
};

export default ReadMoreSection;
