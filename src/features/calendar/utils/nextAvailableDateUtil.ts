import dayjs from "dayjs";
import { isValidDateString } from "@@/features/calendar/utils/date";

export const hasNextAvailableDatePassed = (
  nextAvailableDateString: string
): boolean => {
  const convertedNextAvailableDate = dayjs(nextAvailableDateString);
  const today = dayjs();

  return today.isAfter(convertedNextAvailableDate);
};

export const getDateFromNextAvailableDateString = (
  nextAvailableDateString: string
): string | null => {
  let day: string, month: string, year: string;

  const dateRegExp = /\d{4}([-/ .])\d{2}[-/ .]\d{2}/;
  const result = dateRegExp.exec(nextAvailableDateString);

  if (result) {
    const dateSplit = result[0].split(result[1]);
    day = dateSplit[2];
    month = dateSplit[1];
    year = dateSplit[0];
  }

  if (parseInt(month) > 12) {
    const aux = day;
    day = month;
    month = aux;
  }

  const parsedDate = `${year}-${month}-${day}`;
  const isValid = isValidDateString(parsedDate, "YYYY-MM-DD");
  if (isValid) {
    return parsedDate;
  }

  return null;
};
