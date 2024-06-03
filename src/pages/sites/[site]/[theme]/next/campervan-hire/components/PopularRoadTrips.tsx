import { FC, useMemo, useState } from "react";
import classes from "../CampervanHire.module.scss";
import { popularRoadTripDatas } from "../utils";
import { useCampervanLinks } from "@@/pages/Layout/Campervans/hooks";
import { LazyLoadImage } from "react-lazy-load-image-component";

const PopularRoadTrips: FC = () => {
  const [popularRoadTrips, setPopularRoadTrips] = useState(
    popularRoadTripDatas.find((data) => data.country === "Australia")
  );

  const campervanChannel = useCampervanLinks();

  const imageMaps = useMemo(() => {
    return popularRoadTrips.channel
      .map((channel) => channel)
      .filter((channel) => channel.name === campervanChannel.key)
      .map((channel) => channel.map)
      .join(", ");
  }, [campervanChannel.key, popularRoadTrips.channel]);

  return (
    <div className="container">
      <div className={classes["section"]}>
        <div className={classes["popular-road-trips-section"]}>
          <h2>
            Popular Road Trips <span>{popularRoadTrips.country}</span>
          </h2>

          <div className={classes["prt-content"]}>
            <div className={classes["prt-left"]}>
              <div className={classes["prt-toggle"]}>
                {popularRoadTripDatas.map((data) => (
                  <button
                    key={data.id}
                    className={
                      popularRoadTrips.country === data.country
                        ? classes["prt-toggle-btn-active"]
                        : classes["prt-toggle-btn"]
                    }
                    onClick={() => setPopularRoadTrips(data)}
                  >
                    {data.country}
                  </button>
                ))}
              </div>

              <div className={classes["prt-map"]}>
                <LazyLoadImage
                  src={imageMaps}
                  alt="Popular Road Trips"
                  width="100%"
                  height="auto"
                  effect="opacity"
                />
              </div>
            </div>

            <div className={classes["prt-right"]}>
              {popularRoadTrips.destinations.map((destination) => (
                <div key={destination.id} className={classes["prt-card"]}>
                  <a
                    href={destination.link}
                    target="_blank"
                    rel="noreferrer"
                    className={classes["prt-card-link"]}
                  >
                    <h3>{destination.destination}</h3>
                  </a>
                  <p>{destination.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularRoadTrips;
