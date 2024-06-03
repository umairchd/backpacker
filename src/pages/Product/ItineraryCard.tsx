import React, { FC } from "react";
import { ItineraryCardProps } from "@@/pages/Product/types";
import { Disclosure } from "@headlessui/react";

const ItineraryCard: FC<ItineraryCardProps> = ({ itinerary, isBanner }) => {
  return (
    <div className="white-card">
      <h2
        id="itinerary"
        style={{
          scrollMarginTop: isBanner ? "230px" : "200px",
        }}
        className="mt-8 text-base sm:text-2xl font-bold heading mb-5"
      >
        Itinerary
      </h2>
      <div>
        <div className="mb-2">
          Start Point:
          <br />
          <div className="ms-4">{itinerary.tourStartLocationTitle}</div>
        </div>
        <div className="mb-2">
          End Point:
          <br />
          <div className="ms-4">{itinerary.tourEndLocationTitle}</div>
        </div>
        <div className="space-y-4">
          {itinerary.itineraryItems.map((i, ind) => (
            <Disclosure
              key={i.title}
              as="div"
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    as="h4"
                    className="flex w-full text-left text-base font-bold focus:outline-none focus-visible:ring"
                  >
                    <span
                      className={`${
                        open ? "rotate-90 transform" : ""
                      } shrink-0 transition-transform text-xl inline-block font-bold mr-3 h-fit -mt-1px`}
                    >
                      {">"}
                    </span>
                    {`Day ${ind + 1} - ${i.title} (${i.locationTitle})`}
                  </Disclosure.Button>
                  {i.description?.text && (
                    <Disclosure.Panel className="itineraryCard">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: i.description?.text,
                        }}
                      />
                    </Disclosure.Panel>
                  )}
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
