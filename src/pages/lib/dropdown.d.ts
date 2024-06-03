import React from "react";

export type CustomDropdownProps<P = {}> = P & {
  className?: string | undefined;
  buttonClassName?: string | undefined;
  itemClassName?: string | undefined;
  textClassName?: string | undefined;
  afterSelect?: (eventKey: string | null, e: React.SyntheticEvent<unknown>) => void;
  variant?: "mobile" | "desktop";
};
