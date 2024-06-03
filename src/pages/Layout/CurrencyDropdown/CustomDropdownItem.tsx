import React, { FC } from "react";
import { CustomDropdownItemProps } from "./types";
import clsx from "clsx";

const CustomDropdownItem: FC<CustomDropdownItemProps> = ({ eventKey, onSelect, children, className }) => {
  const handleSelect = () => {
    onSelect(eventKey, null);
  };

  return (
    <li
      className={clsx(className, "list-none m-0")}
      onClick={handleSelect}
    >
      {children}
    </li>
  );
};

export default CustomDropdownItem;
