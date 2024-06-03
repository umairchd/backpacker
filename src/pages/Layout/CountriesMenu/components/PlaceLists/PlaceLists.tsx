import { FC } from "react";
import { PlaceListsProps } from "../../types";
import Link from "next/link";

const PlaceLists: FC<PlaceListsProps> = ({ lists }) => {
  return (
    <div className="sm-max-1139-min-h-300 max-1139-max-h-350 flex flex-wrap flex-col max-w-max sm:h-265px">
      {lists.map((place) => {
        return (
          <Link
            key={place.uniqueName}
            href={place.uri?.url}
            className="hover:text-primary lg:pr-20 sm:text-sm w-auto py-2 text-xs font-normal text-black no-underline capitalize cursor-pointer"
          >
            {place?.name}
          </Link>
        );
      })}
    </div>
  );
};

export default PlaceLists;
