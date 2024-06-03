import { format, utcToZonedTime } from "date-fns-tz";

import { AvailableDateFragment } from "@@/features/calendar/queries/availability-query.generated";
import dayjs, { Dayjs } from "dayjs";

export const compareDates = (date1: string, date2: Date) => {
  const d1 = date1.split("T")[0];
  const d2 = removeTzOffset(date2).toISOString().split("T")[0];
  return d1 === d2;
};

export const removeTzOffset = (d: Date) => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
};

export const setToSydneyTime = (d: Date) => {
  return utcToZonedTime(d, "Australia/Sydney");
};

/**
 * Gets a time and compares it to the current time.
 * @param time1 The first time
 * @returns boolean
 */
export const hasTimePassed = (time1: string) => {
  const time2 = format(new Date(), "hh:mm a");
  const t1 = new Date(`1970-01-01 ${time1}`);
  const t2 = new Date(`1970-01-01 ${time2}`);
  return t1.getTime() < t2.getTime();
};

export const getDayInfo = (
  availableDates: AvailableDateFragment[],
  date: Date
) => availableDates?.find((item) => compareDates(item.date, date));

export const getLocalDateString = (dayjsDate: dayjs.Dayjs): string =>
  dayjsDate?.format("YYYY-MM-DD 00:00:00");

export const getLocalDate = (dayjsDate: dayjs.Dayjs): dayjs.Dayjs =>
  dayjsDate && dayjs(getLocalDateString(dayjsDate));

export const getYearMonthFormat = (dayjsDate: dayjs.Dayjs): string =>
  dayjsDate && dayjsDate.format("YYYY-MM");

/**
 * Given a UTC timezone offset string convert to a number eg "-10:30" converts to -10.5
 * If it is a Z UTC string return 0, if undefined use the browser timezone otherwise calculate the correct time
 * @param timezoneOffsetString
 * @return UTC timezoneoffset as a number
 * @see https://en.wikipedia.org/wiki/List_of_UTC_offsets there are cases of +12:45 and -3:30
 */
export const deriveTimezoneNumberOffset = (
  timezoneOffsetString: string
): number => {
  //use the browser timezone offset as a fallback default for the product timezone offset to stop utcOffset killing the world
  const browserOffsetDefault = dayjs().utcOffset();

  if (!timezoneOffsetString) return browserOffsetDefault;

  //UTC time no time offset
  if (timezoneOffsetString === "Z") return 0;

  const offsetPieces = timezoneOffsetString.split(":");
  if (offsetPieces.length != 2) return browserOffsetDefault;

  const offsetHour: number = +offsetPieces[0];
  const offsetOperator = offsetHour < 0 ? -1 : 1;

  return offsetHour + offsetOperator * (+offsetPieces[1] / 60);
};

export const isValidDateString = (
  dateString: string,
  format?: string
): boolean => {
  let convertedDate: Dayjs;
  let isValidFormat: boolean;

  if (!format) {
    convertedDate = dayjs(dateString);
    isValidFormat = true;
  } else {
    convertedDate = dayjs(dateString, format, true);
    isValidFormat = convertedDate.format(format) === dateString;
  }

  return convertedDate.isValid() && isValidFormat;
};
