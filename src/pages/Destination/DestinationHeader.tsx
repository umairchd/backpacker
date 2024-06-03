import React, { FC } from "react";
import { useServerContext } from "../lib/ServerContextProvider";
import { DestinationHeaderFragment } from "@@/pages/Destination/queries/destination-page-queries.generated";
import ReadMoreSection from "../Product/ProductContent/components/ReadMoreSection";

const DestinationHeader: FC<
  DestinationHeaderFragment & {
    name: string;
  }
> = ({ name, header, subheader, teaser }) => {
  const { channel } = useServerContext();
  const { features } = channel ?? {};

  return (
    <div>
      {name && (
        <h1 className="mt-5 text-38px md:text-40px font-bold text-black leading-normal">
          <span className="text-primary font-bold">{name} </span>Things To Do
        </h1>
      )}
      {!!header && <h2 className="mt-6px text-22px font-normal text-black mb-4">{header}</h2>}
      {features?.includes("listing-page-content") && (subheader || teaser) && (
        <>
          {!!subheader && <p className="text-base text-black mb-4 leading-33px">{subheader}</p>}
          {!!teaser && (
            <ReadMoreSection
              content={teaser}
              count={20}
            />
          )}
        </>
      )}
    </div>
  );
};

export default DestinationHeader;
