import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

// helpers
declare global {
  interface Date {
    stdTimezoneOffset(): number;
    isDstObserved(): boolean;
  }
}

Date.prototype.stdTimezoneOffset = function (): number {
  const jan = new Date(this.getFullYear(), 0, 1);
  const jul = new Date(this.getFullYear(), 6, 1);
  return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
};

Date.prototype.isDstObserved = function (): boolean {
  return this.getTimezoneOffset() < this.stdTimezoneOffset();
};

export function now() {
  let now = dayjs().subtract(dayjs().utcOffset(), "minutes");

  if (now.toDate().isDstObserved()) {
    now = now.subtract(-1, "hour");
  }
  return now;
}

export function formatNumber(number: number) {
  number = Math.floor(number);
  if (number <= 0) {
    return "00";
  }
  if (number < 10) {
    return "0" + number;
  }
  return number.toString();
}
