import { FC } from "react";
import { MenuBodyProps } from "../../types";

import RegionLists from "../RegionLists/RegionLists";
import dynamic from "next/dynamic";

const PlaceLists = dynamic(() => import("../PlaceLists/PlaceLists"), {
  ssr: false,
});

const FeatureLists = dynamic(() => import("../FeatureLists/FeatureLists"), {
  ssr: false,
});

const TopRates = dynamic(() => import("../TopRates/TopRates"), {
  ssr: false,
});

const MenuBody: FC<MenuBodyProps> = (props) => {
  const { countries, setRegion, isActive, listCountry, getFeaturePlaces, getPlaceLists, getTopRatedPlaces } =
    props.menuBody;

  return (
    <div className="flex">
      <div className="min-w-220px bg-gray-50 border-r border-gray-200">
        <RegionLists
          country={countries}
          setRegion={setRegion}
          isActive={isActive}
        />
      </div>

      <div className="w-full bg-white min-w-366px">
        <div className="flex gap-5 p-5">
          <FeatureLists features={getFeaturePlaces} />

          <div className="flex flex-col w-full">
            <PlaceLists lists={getPlaceLists} />

            <TopRates
              rates={getTopRatedPlaces}
              isActive={isActive}
              listCountry={listCountry}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuBody;
