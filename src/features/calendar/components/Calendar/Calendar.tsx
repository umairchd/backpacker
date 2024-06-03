import React from "react";
import { useDispatch } from "react-redux";
import { format } from "date-fns";
import ReactCalendar from "react-calendar";

import {
  getDayInfo,
  getLocalDate,
  getLocalDateString,
} from "@/src/features/calendar/utils/date";
import { AvailableDateFragment } from "@@/features/calendar/queries/availability-query.generated";
import { changeSelectedDate } from "@@/features/calendar/model";

import classes from "../AvailabilityCalendar/AvailabilityCalendar.module.scss";
import { useBreakpoints } from "@@/features/utils";
import dayjs from "dayjs";
import { SlotStatusEnum } from "@@/types.generated";

interface CalenderProps {
  availableDates: AvailableDateFragment[];
  selectedDate: dayjs.Dayjs;
  selectedSeats: number;
  loading: boolean;
  productTimezoneOffset: number;
  onActiveStartDateChange: ({ activeStartDate, view }) => void;
  onClickMonth: (value: Date) => void;
}

const Calendar = ({
  availableDates,
  selectedSeats,
  selectedDate,
  productTimezoneOffset,
  onActiveStartDateChange,
  onClickMonth,
}: CalenderProps) => {
  const dispatch = useDispatch();

  const tileClassName = ({ date, view }) => {
    let className = "calendar__tile";

    if (view === "month") {
      const dayInfo = getDayInfo(availableDates, date);
      const isLastMinuteDeals = dayInfo?.slots?.some(
        (item) => item.isLastMinute && item.status == SlotStatusEnum.Available
      );

      if (isLastMinuteDeals) {
        className += ` ${classes["lm-deal"]}`;
      }

      if (dayjs(date).date() === selectedDate.date()) {
        className += ` calendar__tile-selected`;
      }
    }

    return className;
  };

  const tileContent = ({ date, view }) => {
    if (view === "month" && date) {
      const dayInfo = getDayInfo(availableDates, date);
      const leftSeats = dayInfo?.slots.reduce(
        (acc, curr) => (acc > curr.remainingCount ? acc : curr.remainingCount),
        0
      );

      if (
        leftSeats &&
        leftSeats > 0 &&
        leftSeats <= 20 &&
        dayInfo?.slots.some((slot) => slot.status !== "UNAVAILABLE")
      )
        return <span>{leftSeats} left</span>;
    }

    return null;
  };

  const tileDisabled = ({ date, view }) => {
    const dayInfo = getDayInfo(availableDates, date);

    if (view === "month") {
      return (
        !dayInfo?.hasAvailableSlots ||
        !dayInfo?.slots.some((item) => item.status == "AVAILABLE") ||
        dayInfo?.slots.every((item) => selectedSeats > item.remainingCount)
      );
    } else {
      return false;
    }
  };
  const weekDayFormat = (_, date: Date) => format(date, "EEEEE");

  const onSelectedDateChange = (date: Date) => {
    const selectedDate = dayjs(date);
    dispatch(changeSelectedDate(getLocalDateString(selectedDate)));
  };

  const { smUp: isDesktop } = useBreakpoints();

  if (availableDates.length < 1)
    return (
      <div className={classes["loading-calendar"]}>
        <div className={classes["spinner-border"]} />
      </div>
    );

  const scrollButton = () => {
    if (!isDesktop) {
      window.location.href = "#details-deals";
    }
  };

  return (
    <ReactCalendar
      showNeighboringMonth={false}
      nextLabel={<div className={classes["next-label"]} />}
      prevLabel={<div className={classes["prev-label"]} />}
      onChange={onSelectedDateChange}
      defaultView="month"
      minDetail="year"
      calendarType="US"
      minDate={getLocalDate(dayjs().utcOffset(productTimezoneOffset)).toDate()}
      formatShortWeekday={weekDayFormat}
      onClickMonth={onClickMonth}
      value={selectedDate.toDate()} //always in local date
      tileClassName={tileClassName}
      tileContent={tileContent}
      tileDisabled={tileDisabled}
      onActiveStartDateChange={onActiveStartDateChange}
      onClickDay={scrollButton}
    />
  );
};

export default Calendar;
