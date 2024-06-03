import { FC } from "react";
import DatePicker from "react-datepicker";

import classes from "./DatePicker.module.scss";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerComponentProps {
  value: Date;
  minDate?: Date;
  dateFormat: string;
  error?: boolean;
  showPreviousMonths?: boolean;
  onChange: (Date) => void;
}

const DatePickerComponent: FC<DatePickerComponentProps> = ({
  value,
  error,
  dateFormat = "dd/MM/yyyy",
  showPreviousMonths,
  minDate,
  onChange,
}) => {
  return (
    <DatePicker
      wrapperClassName={`${classes["custom-date-picker-wrapper"]} ${error ? classes["error"] : ""}`}
      calendarClassName={classes["custom-date-picker-calendar"]}
      placeholderText={dateFormat}
      showPreviousMonths={showPreviousMonths}
      selected={value}
      dateFormat={dateFormat}
      minDate={minDate}
      onChange={onChange}
    />
  );
};

export default DatePickerComponent;
