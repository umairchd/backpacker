import getAllProductStatistics from "@@/app/data/getAllProductStatistics";
import getSortedCountries from "@@/app/data/getSortedCountries";
import { getClient } from "@@/app/lib/apolloClient";

import HeroImage from "@@/pages/components/HeroImage/HeroImage";
import Masonry from "./Masonry";
import { getReq } from "@@/app/lib/utils";
import getChannelByHost from "@@/app/data/getChannelByHost";
import { use } from "react";
import {
  TopDestinationPageDocument,
  TopDestinationPageQuery,
  TopDestinationPageQueryVariables,
} from "../top-destinations/queries.generated";

export default function Page() {
  const { host } = getReq();
  const remoteBackgroundImage = `https://${host}/imagesv4/top-destinations-banner.png`;

  const [channel, allStatistics, { data }] = use(
    Promise.all([
      getChannelByHost(host),
      getAllProductStatistics(),
      getClient().query<TopDestinationPageQuery, TopDestinationPageQueryVariables>({
        query: TopDestinationPageDocument,
        variables: { backgroundImage: remoteBackgroundImage },
      }),
    ]),
  );

  const { sortedCountriesWithCities: countries } = getSortedCountries(allStatistics);

  return (
    <>
      <div className="relative max-h-590px overflow-hidden">
        <div>
          <HeroImage
            {...(data?.backgroundImage ?? {})}
            altText="Top Destinations"
          />
        </div>
        <div className="absolute top-0 w-full h-full flex flex-col items-center justify-center">
          <div className="w-full">
            <h1 className="text-5rem leading-7rem text-white font-bold m-4 mt-0 text-center h1-shadow">
              Top Destinations
            </h1>
            <h2 className="text-white text-center w-1/2 mx-auto text-3xl leading-38px">
              Explore activities and things to do in top destinations around the world
            </h2>
          </div>
        </div>
      </div>
      <div className="max-w-1320px px-3 sm:px-6 mx-auto">
        <div className="border-b border-inputBorder p-6">
          <h3 className="text-5xl font-bold mb-4">Top Destinations | {channel.name}</h3>
        </div>
        <Masonry>
          {countries.map(({ country, cities }) => {
            return (
              <div
                className="bg-lightGray mb-30px  p-4 relative flex flex-col border border-inputBorder rounded-lg"
                key={country.id}
              >
                <a
                  href={country.uri.url}
                  className="text-2xl font-medium mb-2 inline-block"
                >
                  <h3>
                    {country.name}
                    {" ›"}
                  </h3>
                </a>
                {cities.map(({ city }) => {
                  return (
                    <a
                      href={city.uri.url}
                      className="text-lg font-normal pb-1 inline-block mb-4"
                      key={city.id}
                    >
                      <h4>
                        {city.name}
                        {" ›"}
                      </h4>
                    </a>
                  );
                })}
              </div>
            );
          })}
        </Masonry>
      </div>
    </>
  );
}

export const revalidate = 300;
