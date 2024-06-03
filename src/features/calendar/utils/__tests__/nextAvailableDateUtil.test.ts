import {
  getDateFromNextAvailableDateString,
  hasNextAvailableDatePassed,
} from "@@/features/calendar/utils/nextAvailableDateUtil";
import dayjs from "dayjs";

describe("Test if the Next Available Date is passed", () => {
  it("should return TRUE if the Next Available Date is a passed date", () => {
    const isNextAvailableDatePassed = hasNextAvailableDatePassed(
      "2000-12-31 23:59:59"
    );

    expect(isNextAvailableDatePassed).toBeTruthy();
    expect(typeof isNextAvailableDatePassed).toBe("boolean");
  });

  it("should return FALSE if the Next Available Date is a future date", () => {
    const futureDate = dayjs().add(1, "year");
    const isNextAvailableDatePassed = hasNextAvailableDatePassed(
      futureDate.format("YYYY-MM-DD HH:ii:ss")
    );

    expect(isNextAvailableDatePassed).toBeFalsy();
    expect(typeof isNextAvailableDatePassed).toBe("boolean");
  });
});

describe("Test GET only date format from the Next Available Date string", () => {
  it("should return only date string", () => {
    let nextAvailableDateString = "2023-12-31T23:59:59+10.00";
    let result = getDateFromNextAvailableDateString(nextAvailableDateString);

    expect(result).toBe("2023-12-31");
    expect(typeof result).toBe("string");

    nextAvailableDateString = "2023-24-05T00:00:00+07.00";
    expect(getDateFromNextAvailableDateString(nextAvailableDateString)).toBe(
      "2023-05-24"
    );
  });

  it("should return NULL when the date is invalid", () => {
    const invalidNextAvailableDateString = "2099-31-31T00:00:00+11";
    let result = getDateFromNextAvailableDateString(
      invalidNextAvailableDateString
    );

    expect(result).toBeNull();
  });
});
