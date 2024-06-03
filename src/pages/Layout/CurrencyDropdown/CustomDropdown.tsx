import React, { FC } from "react";
import { CustomDropdownItemProps, CustomDropdownProps } from "./types";

const CustomDropdown: FC<CustomDropdownProps> = ({ onSelect, children }) => {
  return (
    <>
      {React.Children.map(children, (child) => {
        if (React.isValidElement<CustomDropdownItemProps>(child)) {
          return React.cloneElement(child, {
            onSelect,
          });
        }
        return null;
      })}
    </>
  );
};

export default CustomDropdown;
