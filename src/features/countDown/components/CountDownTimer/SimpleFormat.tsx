import React, { FC } from "react";
import { FormatCountProps } from ".";
import { BiTimer } from "react-icons/bi";

const SimpleFormat: FC<FormatCountProps> = ({
  days,
  hours,
  minutes,
  seconds,
  format = "simple",
}) => {
  return (
    <>
      {(days || hours) && (
        <div className="text-sm font-medium py-2 px-3 rounded-tl-lg rounded-tr-lg bg-primary bg-card flex items-center justify-center text-white">
          <BiTimer className="mr-1 text-xl text-white" />
          <span className="text-xs font-medium">
            <span className="text-xs font-medium">Ends in </span>
            {days ? (
              <>
                {days} <span className="text-xs font-medium"> days</span>
              </>
            ) : (
              <>
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
              </>
            )}
          </span>
        </div>
      )}
    </>
  );
};

export default SimpleFormat;
