import dayjs from "dayjs";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { formatNumber } from "./utils";
import { CountDownTime } from "./types";
import { RootState } from "../../store";

const selectSelf = (state: RootState) => state.timer;

export const getCountDownTo = (countDownLimit: number) =>
  createDraftSafeSelector(selectSelf, (state): CountDownTime => {
    const { now } = state;
    const end = dayjs.unix(countDownLimit).subtract(10, "hours");
    const widgetLimit = dayjs.duration(end.diff(now));

    if (widgetLimit.asDays() > 2) {
      return {
        days: formatNumber(widgetLimit.asDays()),
      };
    }

    return {
      hours: formatNumber(widgetLimit.asHours()),
      minutes: formatNumber(widgetLimit.minutes()),
      seconds: formatNumber(widgetLimit.seconds()),
    };
  });
