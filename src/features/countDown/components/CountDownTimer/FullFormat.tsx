import React, { FC } from "react";
import { FormatCountProps } from ".";
import { BiTimer } from "react-icons/bi";

const FullFormat: FC<FormatCountProps> = ({
  days,
  hours,
  minutes,
  seconds,
}) => {
  return (
    <>
      {(days || hours) && (
        <div className="text-sm font-medium py-2 px-3 rounded-tl-lg rounded-tr-lg bg-primary bg-card flex items-center justify-center text-white">
          <BiTimer className="mr-1 text-xl text-white" />
          <div className="text-xs font-medium">
            <span className="text-xs font-medium">Last Minute Deal</span>
            <span>
              {days && (
                <>
                  {days} <span className="text-xs font-medium"> days</span>
                </>
              )}
              {hours && (
                <>
                  {" "}
                  {hours}
                  <span className="text-xs font-medium">h</span>
                </>
              )}
              {minutes && (
                <>
                  {" "}
                  {minutes}
                  <span className="text-xs font-medium">m</span>
                </>
              )}
              {seconds && (
                <>
                  {" "}
                  {seconds}
                  <span className="text-xs font-medium">s</span>
                </>
              )}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default FullFormat;
