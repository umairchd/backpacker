import { FC } from "react";
import { useBreakpoints } from "@@/features/utils";

import AnimationLoading from "@@/features/animationLoading/AnimationLoading";
import Skeleton from "@@/pages/components/Skeleton";
import classes from "./AvailabilityCalendar.module.scss";

const AvailabilityCalendarSkeleton: FC = () => {
  const { mdUp } = useBreakpoints();
  return (
    <>
      <div className={classes["pickerCont"]}>
        <div className={`${classes["calendarStep"]} mb-3`}>
          <span className="text-base md:text-2xl font-bold text-black mb-3 px-6">
            STEP 1: Select Number of Travellers
          </span>
        </div>
        <div className="flex gap-2 items-center mb-3 ml-7">
          {mdUp ? (
            <>
              <Skeleton
                height={50}
                width={200}
              />
              <Skeleton
                height={50}
                width={200}
              />
              <Skeleton
                height={50}
                width={200}
              />
            </>
          ) : (
            <Skeleton
              height={50}
              width={300}
            />
          )}
        </div>
      </div>
      <div className={`${classes["calender-detail-cont"]}`}>
        <div className="grid grid-cols-12 gap-6">
          <div className="md:col-span-6 col-span-12">
            <div className={classes["calendar-container"]}>
              <div className={classes["calendarStep"]}>
                <span className="text-base md:text-2xl font-bold text-black">STEP 2: Select Travel Date</span>
              </div>
              <div className={classes["skeleton-calendar"]}>
                <AnimationLoading calendar={true}>
                  <span>
                    We&lsquo;re finding you some dates <br />
                    and the best deal! Sit tight.
                  </span>
                </AnimationLoading>
              </div>
              <div className={classes["line"]} />
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 rounded-br-lg overflow-hidden">
            <div
              className="bg-lightGray max-h-57vh overflow-auto w-full relative p-4"
              style={{ overflowY: "hidden" }}
            >
              <div className={classes["date-header"]}>
                <Skeleton
                  height={20}
                  width={100}
                  style={{ margin: "-10px 0" }}
                />
              </div>
              <div className="deals-cards-cont scroll-indicator">
                {[1, 2, 3].map((index) => (
                  <div key={`deal-skeleton-${index}`}>
                    <div className="deal-time">
                      <div className="deal-time-skeleton">
                        <Skeleton
                          width={60}
                          height={25}
                          style={{
                            marginRight: "10px",
                          }}
                        />
                        <span>start time</span>
                      </div>
                    </div>

                    <div className="deal-card-2">
                      <div className="title">
                        <Skeleton
                          width={200}
                          height={40}
                          style={{ margin: "-10px 0" }}
                        />
                      </div>
                      <div className="price-button-cont">
                        <div className="price-skeleton">
                          <Skeleton
                            width={100}
                            height={30}
                            style={{ margin: "-10px 0" }}
                          />
                        </div>
                        <div className="button-skeleton">
                          <button
                            type="button"
                            className="text-white uppercase rounded-full h-9 outline-none bg-primary border border-primary w-160px flex items-center justify-center text-base font-bold opacity-60 px-6"
                            disabled
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AvailabilityCalendarSkeleton;
