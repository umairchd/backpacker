import { FC, useState } from "react";
import classes from "../CampervanHire.module.scss";
import defaultAvatar from "../icons/default-user.jpg";
import { roadTripPlanDatas } from "../utils";
import clsx from "clsx";
import OptimizedHeroImage from "@@/pages/components/HeroImage/OptimizedHeroImage";

const RoadTripPlan: FC = () => {
  const [roadTripPlan, setRoadTripPlan] = useState(roadTripPlanDatas.find((data) => data.country === "Australia"));

  return (
    <div className="container">
      <div className={classes["section"]}>
        <div className={classes["road-trip-plan-section"]}>
          <div className={classes["rtp-title"]}>
            <h2>Ready To Plan Your Road Trip?</h2>
            <p>
              Not only are we dedicated to getting you the best price, we also want to provide the best advice when it
              comes to planning your road trip around Australia or New Zealand.
            </p>
          </div>

          <div className={classes["rtp-blogs"]}>
            <div className={classes["rtp-button"]}>
              <div className={classes["rtp-toggle"]}>
                {roadTripPlanDatas.map((data) => (
                  <button
                    key={data.id}
                    className={
                      roadTripPlan.country === data.country
                        ? classes["rtp-toggle-btn-active"]
                        : classes["rtp-toggle-btn"]
                    }
                    onClick={() => setRoadTripPlan(data)}
                  >
                    {data.country}
                  </button>
                ))}
              </div>
            </div>

            <div className={clsx(classes["rtp-content"], "responsive-grid h-scroll-lg g-4")}>
              {roadTripPlan.blogs.map((blog) => (
                <div
                  key={blog.id}
                  className={classes["rtp-card"]}
                >
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noreferrer"
                    className={classes["rtp-card-link"]}
                  >
                    <div className={classes["rtp-card-img"]}>
                      <OptimizedHeroImage
                        src={blog.image}
                        alt={blog.title}
                      />
                    </div>
                    <div className={classes["rtp-card-content"]}>
                      <h3>{blog.title}</h3>
                      <div className={classes["rtp-card-author"]}>
                        <span>
                          <img
                            src={blog.avatar ? blog.avatar : defaultAvatar.src}
                            alt="author"
                            loading="eager"
                            width={30}
                            height={30}
                          />
                          {blog.author}
                        </span>
                        <span>{blog.date}</span>
                      </div>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadTripPlan;
