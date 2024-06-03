import { FC } from "react";
import { useSelector } from "react-redux";
import { getCountDownTo } from "../../model";
import SimpleFormat from "./SimpleFormat";
import FullFormat from "./FullFormat";

interface CountDownTimerProps {
  countDownLimit: number;
  format: "simple" | "full" | "simple-pages";
}

const CountDownTimer: FC<CountDownTimerProps> = ({
  countDownLimit,
  format = "simple",
}) => {
  const { days, hours, minutes, seconds } = useSelector(
    getCountDownTo(countDownLimit)
  );

  function isLastMinuteDealStillValid() {
    return (
      (days && parseInt(days) > 0) ||
      (hours && parseInt(hours) > 0) ||
      (minutes && parseInt(minutes) > 0) ||
      (seconds && parseInt(seconds) > 0)
    );
  }

  if (!isLastMinuteDealStillValid()) {
    return null;
  }

  switch (format) {
    case "simple":
      return (
        <SimpleFormat
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    case "simple-pages":
      return (
        <SimpleFormat
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          format="simple-pages"
        />
      );
    case "full":
      return (
        <FullFormat
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
      );
    default:
      return null;
  }
};

export default CountDownTimer;
